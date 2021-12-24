//! Program instruction processor

use quick_protobuf::BytesReader;
use quick_protobuf::MessageRead;
use solana_program::account_info::next_account_info;
use solana_program::program::invoke;
use solana_program::system_instruction;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, log::sol_log_compute_units, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

use crate::instructions::mod_DemoInstructionData::OneOfkind;
use crate::instructions::DonateInstruction;
use crate::instructions::TransferInstruction;
use crate::instructions::{AddInstruction, DemoInstructionData, EchoInstruction};
pub struct Processor {}

impl Processor {
    pub fn process_instruction(
        _program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        msg!("Demo start!");

        let mut reader = BytesReader::from_bytes(&instruction_data);
        let ins = DemoInstructionData::from_reader(&mut reader, &instruction_data).unwrap();

        match ins.kind {
            OneOfkind::echo(ins) => Processor::echo(ins),
            OneOfkind::add(ins) => Processor::add(ins),
            OneOfkind::transfer(ins) => Processor::transfer(ins, accounts),
            OneOfkind::donate(ins) => Processor::donate(ins),
            OneOfkind::None => {
                return Err(ProgramError::InvalidInstructionData);
            }
        }

        sol_log_compute_units();

        Ok(())
    }

    fn echo(ins: EchoInstruction) {
        msg!("Echo: {}", ins.str_pb);
    }

    fn add(ins: AddInstruction) {
        let a = ins.a as i32;
        let b = ins.b as i32;
        msg!("Add: {} + {} = {}", a, b, a + b);
    }

    fn transfer(_ins: TransferInstruction, accounts: &[AccountInfo]) {
        let accounts_iter = &mut accounts.iter();
        let from = next_account_info(accounts_iter).unwrap();
        let to = next_account_info(accounts_iter).unwrap();

        let transfer_instruction = system_instruction::transfer(from.key, to.key, 42);

        let res = invoke(&transfer_instruction, accounts);

        if res.is_ok() {
            msg!("Transfer: {:#?} -> {:#?}", from.key, to.key);
        } else {
            msg!("Transfer failed: {:#?} -> {:#?}", from.key, to.key);
            msg!("Error: {:#?}", res);
        }
    }

    fn donate(ins: DonateInstruction) {
        msg!("Donate: {}", ins.amount);
    }
}
