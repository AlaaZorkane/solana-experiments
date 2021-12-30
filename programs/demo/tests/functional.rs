#![cfg(feature = "test-bpf")]

use std::borrow::Cow;

use demo::*;
use demo::{instructions::*, state::JarAccountState};
use quick_protobuf::{BytesReader, MessageRead, MessageWrite, Writer};
use solana_program::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
};
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

// #[tokio::test]
// async fn test_transfer() {
//     let (mut banks_client, payer, recent_blockhash) = program_test().start().await;

//     let keypairOne = Keypair::new();
//     let pubkeyOne = keypairOne.pubkey();
//     // let pubkeyOneStr = Cow::Borrowed(&pubkeyOne.to_string());

//     let keypairTwo = Keypair::new();
//     let pubkeyTwo = keypairTwo.pubkey();
//     // let pubkeyTwoStr = Cow::Borrowed(&pubkeyTwo.to_owned());

//     let mut data = Vec::new();
//     let mut writer = Writer::new(&mut data);
//     let message = DemoInstructionData {
//         kind: mod_DemoInstructionData::OneOfkind::transfer(TransferInstruction {
//             from: Cow::Borrowed("yo"),
//             to: Cow::Borrowed("hello"),
//         }),
//     };

//     writer
//         .write_message(&message)
//         .expect("Cannot write message!");
// }

#[tokio::test]
async fn test_serialization() {
    let state = JarAccountState {
        authority: "yo!".to_string(),
        donation_amount: 42,
        last_donation_time: 1337,
    };

    let mut data = Vec::new();
    let mut writer = Writer::new(&mut data);
    writer.write_message(&state).expect("Cannot write message!");

    let len = state.get_size();
    let mut serialized_data = vec![0u8; len + 1];
    let mut serialized_data_2 = vec![0u8; len];

    quick_protobuf::serialize_into_slice(&state, &mut serialized_data).unwrap();
    quick_protobuf::serialize_into_slice_without_len(&state, &mut serialized_data_2).unwrap();

    let state_1 =
        quick_protobuf::deserialize_from_slice_without_len::<JarAccountState>(&serialized_data_2)
            .unwrap();

    println!("yo!");
}

#[tokio::test]
async fn test_random() {
    let pubkey = Pubkey::new_unique();

    let str = pubkey.to_string();

    println!("pubkey: {}", str);
}
