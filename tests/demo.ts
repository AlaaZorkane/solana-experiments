import {
  AccountMeta,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { deserialize, serialize } from "@solvei/borsh";
import { generateSchemas } from "@solvei/borsh/schema";
import {
  AddInstruction,
  DemoInstructionData,
  EchoInstruction,
} from "../generated/programs/demo/instructions";

const programId = new PublicKey("2G6M4rDxMTHavf3JwS3XVEuDLokJTeDNok43W29LVZZJ");

const main = async () => {
  // SETUP
  const connection = new Connection(clusterApiUrl("devnet"));

  const keypairOne = Keypair.generate();
  const keypairTwo = Keypair.generate();

  console.log("Public key (1):", keypairOne.publicKey.toBase58());
  console.log("Public key (2):", keypairTwo.publicKey.toBase58());

  const airdrop = await connection.requestAirdrop(
    keypairOne.publicKey,
    LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdrop);

  console.log("Airdrop:", airdrop);

  // CONSTRUCTION

  const demoInstruction = DemoInstructionData.encode({
    kind: {
      $case: "transfer",
      transfer: {
        from: keypairOne.publicKey.toBase58(),
        to: keypairTwo.publicKey.toBase58(),
      },
    },
  }).finish();

  /**
   * account[0] = from
   * account[1] = to
   */
  const keys: AccountMeta[] = [
    {
      pubkey: keypairOne.publicKey,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: keypairTwo.publicKey,
      isSigner: false,
      isWritable: false,
    },
  ];

  const instruction = new TransactionInstruction({
    keys,
    programId,
    data: Buffer.from(demoInstruction),
  });

  // EXECUTION
  const transaction = new Transaction();

  transaction.add(instruction);

  try {
    const tx = await sendAndConfirmTransaction(connection, transaction, [
      keypairOne,
    ]);
    console.log("Transaction:", tx);
  } catch (err) {
    console.log("Error");
    console.error(err);
  }
};

main()
  .then(() => process.exit(0))
  .catch(console.error);
