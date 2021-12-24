#![cfg(feature = "test-bpf")]

use std::borrow::Cow;

use demo::instructions::*;
use demo::*;
use quick_protobuf::{BytesReader, MessageRead, Writer};
use solana_program::instruction::{AccountMeta, Instruction};
use solana_program_test::*;
use solana_sdk::{signature::Keypair, signer::Signer, transaction::Transaction};

fn program_test() -> ProgramTest {
    ProgramTest::new(
        "demo",
        id(),
        processor!(processor::Processor::process_instruction),
    )
}

#[tokio::test]
async fn test_demo() {
    let (mut banks_client, payer, recent_blockhash) = program_test().start().await;

    let keypair = Keypair::new();
    let pubkey = keypair.pubkey();

    let mut data = Vec::new();
    let mut writer = Writer::new(&mut data);
    let message = DemoInstructionData {
        kind: mod_DemoInstructionData::OneOfkind::add(AddInstruction { a: 1, b: 2 }),
    };

    writer
        .write_message(&message)
        .expect("Cannot write message!");

    // @see https://github.com/tafia/quick-protobuf/issues/202
    data.remove(0);

    let mut reader = BytesReader::from_bytes(&data);
    DemoInstructionData::from_reader(&mut reader, &data).unwrap();

    let mut transaction = Transaction::new_with_payer(
        &[Instruction {
            program_id: id(),
            accounts: vec![AccountMeta::new_readonly(pubkey, false)],
            data,
        }],
        Some(&payer.pubkey()),
    );

    transaction.sign(&[&payer], recent_blockhash);

    banks_client.process_transaction(transaction).await.unwrap();
}

#[tokio::test]
async fn test_transfer() {
    let (mut banks_client, payer, recent_blockhash) = program_test().start().await;

    let keypairOne = Keypair::new();
    let pubkeyOne = keypairOne.pubkey();
    // let pubkeyOneStr = Cow::Borrowed(&pubkeyOne.to_string());

    let keypairTwo = Keypair::new();
    let pubkeyTwo = keypairTwo.pubkey();
    // let pubkeyTwoStr = Cow::Borrowed(&pubkeyTwo.to_owned());

    let mut data = Vec::new();
    let mut writer = Writer::new(&mut data);
    let message = DemoInstructionData {
        kind: mod_DemoInstructionData::OneOfkind::transfer(TransferInstruction {
            from: Cow::Borrowed("yo"),
            to: Cow::Borrowed("hello"),
        }),
    };

    writer
        .write_message(&message)
        .expect("Cannot write message!");
}
