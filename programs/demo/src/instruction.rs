use borsh::{BorshDeserialize, BorshSerialize};

#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub enum DemoInstruction {
    Echo { str: String },
    Add { a: u64, b: u64 },
}
