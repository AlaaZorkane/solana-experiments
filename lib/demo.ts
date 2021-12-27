import {
  AccountMeta,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { DemoInstructionData } from "../generated/programs/demo/instructions";

// TODO: Is there a way to programmatically generate this?
export class DemoInstructionBuilder {
  constructor(
    public connection: Connection,
    public wallet: Keypair,
    public programId: PublicKey
  ) {
    this.connection = connection;
    this.wallet = wallet;
  }

  echo(message: string): TransactionInstruction {
    const echoInstructionData = DemoInstructionData.encode({
      kind: {
        $case: "echo",
        echo: {
          str: message,
        },
      },
    }).finish();

    const keys: AccountMeta[] = [
      {
        pubkey: this.wallet.publicKey,
        isSigner: true,
        isWritable: false,
      },
    ];

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data: Buffer.from(echoInstructionData),
    });
  }

  add(a: number, b: number): TransactionInstruction {
    const addInstructionData = DemoInstructionData.encode({
      kind: {
        $case: "add",
        add: {
          a,
          b,
        },
      },
    }).finish();

    const keys: AccountMeta[] = [
      {
        pubkey: this.wallet.publicKey,
        isSigner: true,
        isWritable: false,
      },
    ];

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data: Buffer.from(addInstructionData),
    });
  }

  transfer(to: PublicKey, amount: number): TransactionInstruction {
    const transferInstructionData = DemoInstructionData.encode({
      kind: {
        $case: "transfer",
        transfer: {
          amount,
        },
      },
    }).finish();

    const keys: AccountMeta[] = [
      {
        pubkey: this.wallet.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: to,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ];

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data: Buffer.from(transferInstructionData),
    });
  }

  donate(amount: number): TransactionInstruction {
    const donateInstructionData = DemoInstructionData.encode({
      kind: {
        $case: "donate",
        donate: {
          amount,
        },
      },
    }).finish();

    const keys: AccountMeta[] = [
      {
        pubkey: this.wallet.publicKey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ];

    return new TransactionInstruction({
      keys,
      programId: this.programId,
      data: Buffer.from(donateInstructionData),
    });
  }
}
