//! Program instruction processor

use borsh::BorshDeserialize;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, log::sol_log_compute_units, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

use crate::instruction::DemoInstruction;

pub struct Processor {}

impl Processor {
    /// entrypoint kindof
    pub fn process_instruction(
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        // Log a string
        msg!("Demo start!");
        let instruction = DemoInstruction::try_from_slice(instruction_data)
            .map_err(|_| ProgramError::InvalidInstructionData)?;

        match instruction {
            DemoInstruction::Echo { str } => {
                msg!("Instruction: Echo");
                Processor::echo(str);
            }
            DemoInstruction::Add { a, b } => {
                msg!("Instruction: Add");
                Processor::add(a, b);
            }
        }

        sol_log_compute_units();

        Ok(())
    }

    fn echo(str: String) {
        msg!("Echo: {}", str);
    }

    fn add(a: u64, b: u64) {
        msg!("Add: {} + {} = {}", a, b, a + b);
    }
}
