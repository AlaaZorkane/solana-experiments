//! Program entrypoint

use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

use crate::processor::Processor;

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let result = Processor::process_instruction(program_id, accounts, instruction_data);

    match result {
        Ok(()) => return Ok(()),
        Err(error) => {
            msg!("An error occurred!");
            return Err(error);
        }
    };
}
