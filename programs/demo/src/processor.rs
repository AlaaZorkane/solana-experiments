//! Program instruction processor

use quick_protobuf::BytesReader;
use quick_protobuf::MessageRead;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, log::sol_log_compute_units, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

use crate::instructions::{
    mod_DemoInstructionData, AddInstruction, DemoInstructionData, EchoInstruction,
};
pub struct Processor {}

impl Processor {
    pub fn process_instruction(
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        msg!("Demo start!");

        let mut reader = BytesReader::from_bytes(&instruction_data);
        let ins = DemoInstructionData::from_reader(&mut reader, &instruction_data).unwrap();

        match ins.instruction_oneof {
            mod_DemoInstructionData::OneOfinstruction_oneof::echo(ins) => Processor::echo(ins),
            mod_DemoInstructionData::OneOfinstruction_oneof::add(ins) => Processor::add(ins),
            mod_DemoInstructionData::OneOfinstruction_oneof::None => {
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
}
