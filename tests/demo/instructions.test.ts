import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AIRDROP_KEY, DEMO_PROGRAM_ID, MAYBE_FEE } from "../utils";
import { DemoInstructionBuilder } from "../../lib/demo";

describe("demo instructions", () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = new Keypair();
  const programId = DEMO_PROGRAM_ID;

  // Everyone that has some SOL in their account
  // needs to give back to the system
  const giveback = [wallet];

  const demoBuilder = new DemoInstructionBuilder(connection, wallet, programId);

  // Airdrop
  beforeAll(async () => {
    const airdrop = await connection.requestAirdrop(
      wallet.publicKey,
      LAMPORTS_PER_SOL * 2
    );

    const confirmedTX = await connection.confirmTransaction(airdrop);

    console.log("Airdrop confirmed 🚀:", confirmedTX);
  });

  it("tx with echo instruction", async () => {
    const echoInstruction = demoBuilder.echo("Hello from Vitest 🚀");

    const transaction = new Transaction();

    transaction.add(echoInstruction);

    const tx = await sendAndConfirmTransaction(connection, transaction, [
      wallet,
    ]);

    console.log("TX:", tx);

    expect(tx).toBeDefined();
  });

  it("tx with add instruction", async () => {
    const addInstruction = demoBuilder.add(13, 37);

    const transaction = new Transaction();

    transaction.add(addInstruction);

    const tx = await sendAndConfirmTransaction(connection, transaction, [
      wallet,
    ]);

    console.log("TX:", tx);

    expect(tx).toBeDefined();
  });

  it("tx with transfer instruction", async () => {
    const to = new Keypair();
    giveback.push(to);

    const transferInstruction = demoBuilder.transfer(
      to.publicKey,
      LAMPORTS_PER_SOL / 2
    );

    const transaction = new Transaction();

    transaction.add(transferInstruction);

    const tx = await sendAndConfirmTransaction(connection, transaction, [
      wallet,
    ]);

    console.log("TX:", tx);

    expect(tx).toBeDefined();
  });

  // TODO: donate test

  // Give back all lamports to the system
  afterAll(async () => {
    const transaction = new Transaction();

    const balancesPromises = [];
    for (let index = 0; index < giveback.length; index++) {
      const keypair = giveback[index];
      balancesPromises.push(connection.getBalance(keypair.publicKey));
    }

    const balances = await Promise.all(balancesPromises);

    giveback.forEach((keypair, index) => {
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          lamports: balances[index] - MAYBE_FEE,
          toPubkey: AIRDROP_KEY,
        })
      );
    });

    const tx = await sendAndConfirmTransaction(
      connection,
      transaction,
      giveback
    );

    console.log("Gave back all lamports to the system 🚀:", tx);
  });
});
