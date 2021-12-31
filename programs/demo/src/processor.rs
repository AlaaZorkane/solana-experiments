//! Program instruction processor

use quick_protobuf::deserialize_from_slice_without_len;
use quick_protobuf::serialize_into_slice_without_len;
use solana_program::account_info::next_account_info;
use solana_program::clock::Clock;
use solana_program::program::invoke_signed;
use solana_program::rent::Rent;
use solana_program::system_instruction;
use solana_program::sysvar::Sysvar;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, log::sol_log_compute_units, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

use crate::instructions::mod_DemoInstructionData::OneOfkind;
use crate::instructions::DonateInstruction;
use crate::instructions::TransferInstruction;
use crate::instructions::{AddInstruction, DemoInstructionData, EchoInstruction};
use crate::state::JarAccountState;
use crate::unwrap_or_return_error;
pub struct Processor {}

impl Processor {
    pub fn process_instruction(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        msg!("Demo start!");

        let ins = unwrap_or_return_error!(
            deserialize_from_slice_without_len::<DemoInstructionData>(&instruction_data),
            ProgramError::InvalidInstructionData
        );

        let ret: ProgramResult = match ins.kind {
            OneOfkind::echo(ins) => Processor::echo(ins),
            OneOfkind::add(ins) => Processor::add(ins),
            OneOfkind::transfer(ins) => Processor::transfer(ins, accounts),
            OneOfkind::donate(ins) => Processor::donate(ins, accounts, program_id),
            OneOfkind::None => {
                return Err(ProgramError::InvalidInstructionData);
            }
        };

        sol_log_compute_units();

        ret
    }

    fn echo(ins: EchoInstruction) -> ProgramResult {
        msg!("Echo: {}", ins.str_pb);

        Ok(())
    }

    fn add(ins: AddInstruction) -> ProgramResult {
        let a = ins.a as i32;
        let b = ins.b as i32;
        msg!("Add: {} + {} = {}", a, b, a + b);

        Ok(())
    }

    fn transfer(ins: TransferInstruction, accounts: &[AccountInfo]) -> ProgramResult {
        let accounts_iter = &mut accounts.iter();
        let from = next_account_info(accounts_iter).unwrap();
        let to = next_account_info(accounts_iter).unwrap();

        let transfer_instruction = system_instruction::transfer(from.key, to.key, ins.amount);

        let res = invoke_signed(&transfer_instruction, accounts, &[]);

        if res.is_ok() {
            msg!("Transfer: {:#?} -> {:#?}", from.key, to.key);
        } else {
            msg!("Transfer failed: {:#?} -> {:#?}", from.key, to.key);
            msg!("Error: {:#?}", res);
        }

        res
    }

    /**
     * Creates a donation account for each donation
     * if and account already exists, add the amount to the existing account
     * each pubkey has a donator account that is used to track the total amount donated
     */
    fn donate(
        ins: DonateInstruction,
        accounts: &[AccountInfo],
        program_id: &Pubkey,
    ) -> ProgramResult {
        let accounts_iter = &mut accounts.iter();

        let from = next_account_info(accounts_iter).unwrap();
        let jar = next_account_info(accounts_iter).unwrap();
        let amount = ins.amount;
        let jar_bump_seed = ins.jar_bump_seed as u8;

        let jar_exist = !jar.data_is_empty();

        if !jar_exist {
            let rent = Rent::get().unwrap();

            if !rent.is_exempt(amount, 128) {
                return Err(ProgramError::AccountNotRentExempt);
            }

            let space = 1024; // can be calculated from quickbuf?
            match invoke_signed(
                &system_instruction::create_account(
                    &from.key,
                    &jar.key,
                    amount,
                    space,
                    &program_id,
                ),
                &[from.clone(), jar.clone()],
                &[&[b"jar", from.key.as_ref(), &[jar_bump_seed]]],
            ) {
                Ok(_) => {
                    msg!("Created new donation jar for {:#?}", from.key);
                }
                Err(e) => {
                    msg!("Jar creation failed for {:#?}", from.key);
                    msg!("Error: {:#?}", e);
                    return Err(e);
                }
            }

            let clock = Clock::get().unwrap();

            let state = JarAccountState {
                authority: from.key.to_string(),
                donation_amount: 1,
                last_donation_time: clock.unix_timestamp,
            };

            serialize_into_slice_without_len(&state, *jar.data.borrow_mut()).unwrap();
        } else {
            let mut jar_state =
                deserialize_from_slice_without_len::<JarAccountState>(*jar.data.borrow()).unwrap();

            if from.key.to_string() != jar_state.authority {
                return Err(ProgramError::IllegalOwner);
            }

            match invoke_signed(
                &system_instruction::transfer(&from.key, &jar.key, amount),
                &[from.clone(), jar.clone()],
                &[&[b"jar", from.key.as_ref(), &[jar_bump_seed]]],
            ) {
                Ok(_) => {
                    msg!("Donation: {:#?} -> {:#?}", from.key, jar.key);
                }
                Err(e) => {
                    msg!("Donation failed: {:#?} -> {:#?}", from.key, jar.key);
                    msg!("Error: {:#?}", e);
                    return Err(e);
                }
            };

            jar_state.donation_amount += amount;
            jar_state.last_donation_time = Clock::get().unwrap().unix_timestamp;

            serialize_into_slice_without_len(&jar_state, *jar.data.borrow_mut()).unwrap();
        }

        Ok(())
    }
}
