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

  // const instruction = new TransactionInstruction({
  //   keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
  //   programId,
  //   data: Buffer.from("Hello, world!"),
  // });

  // const transaction = new Transaction();

  // transaction.add(instruction);

  // const tx = await sendAndConfirmTransaction(connection, transaction, [
  //   keypair,
  // ]);

  // console.log("Transaction:", tx);
};

main()
  .then(() => process.exit(0))
  .catch(console.error);
