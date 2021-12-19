import {
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

const programId = new PublicKey("zxYPiKJkBtpkyhqspFT2oCV3NXtY24oCrsw6sqwQL1G");

const main = async () => {
  const keypair = Keypair.generate();
  const connection = new Connection(clusterApiUrl("devnet"));

  console.log("Public key:", keypair.publicKey.toBase58());

  const airdrop = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdrop);

  console.log("Airdrop:", airdrop);

  const demoInstruction = DemoInstructionData.encode({
    add: undefined,
    echo: { str: "Hello, world!" },
  }).finish();

  const instruction = new TransactionInstruction({
    keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
    programId,
    data: Buffer.from(demoInstruction),
  });

  const transaction = new Transaction();

  transaction.add(instruction);

  try {
    const tx = await sendAndConfirmTransaction(connection, transaction, [
      keypair,
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
