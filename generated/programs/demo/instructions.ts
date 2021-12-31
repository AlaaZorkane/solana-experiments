/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface DemoInstructionData {
  kind?:
    | { $case: "echo"; echo: EchoInstruction }
    | { $case: "add"; add: AddInstruction }
    | { $case: "transfer"; transfer: TransferInstruction }
    | { $case: "donate"; donate: DonateInstruction };
}

export interface EchoInstruction {
  str: string;
}

export interface AddInstruction {
  a: number;
  b: number;
}

export interface TransferInstruction {
  amount: number;
}

export interface DonateInstruction {
  amount: number;
  jarBumpSeed: number;
}

function createBaseDemoInstructionData(): DemoInstructionData {
  return { kind: undefined };
}

export const DemoInstructionData = {
  encode(
    message: DemoInstructionData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.kind?.$case === "echo") {
      EchoInstruction.encode(
        message.kind.echo,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.kind?.$case === "add") {
      AddInstruction.encode(
        message.kind.add,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.kind?.$case === "transfer") {
      TransferInstruction.encode(
        message.kind.transfer,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.kind?.$case === "donate") {
      DonateInstruction.encode(
        message.kind.donate,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DemoInstructionData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDemoInstructionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = {
            $case: "echo",
            echo: EchoInstruction.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.kind = {
            $case: "add",
            add: AddInstruction.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.kind = {
            $case: "transfer",
            transfer: TransferInstruction.decode(reader, reader.uint32()),
          };
          break;
        case 4:
          message.kind = {
            $case: "donate",
            donate: DonateInstruction.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DemoInstructionData {
    const message = createBaseDemoInstructionData();
    if (object.echo !== undefined && object.echo !== null) {
      message.kind = {
        $case: "echo",
        echo: EchoInstruction.fromJSON(object.echo),
      };
    }
    if (object.add !== undefined && object.add !== null) {
      message.kind = { $case: "add", add: AddInstruction.fromJSON(object.add) };
    }
    if (object.transfer !== undefined && object.transfer !== null) {
      message.kind = {
        $case: "transfer",
        transfer: TransferInstruction.fromJSON(object.transfer),
      };
    }
    if (object.donate !== undefined && object.donate !== null) {
      message.kind = {
        $case: "donate",
        donate: DonateInstruction.fromJSON(object.donate),
      };
    }
    return message;
  },

  toJSON(message: DemoInstructionData): unknown {
    const obj: any = {};
    message.kind?.$case === "echo" &&
      (obj.echo = message.kind?.echo
        ? EchoInstruction.toJSON(message.kind?.echo)
        : undefined);
    message.kind?.$case === "add" &&
      (obj.add = message.kind?.add
        ? AddInstruction.toJSON(message.kind?.add)
        : undefined);
    message.kind?.$case === "transfer" &&
      (obj.transfer = message.kind?.transfer
        ? TransferInstruction.toJSON(message.kind?.transfer)
        : undefined);
    message.kind?.$case === "donate" &&
      (obj.donate = message.kind?.donate
        ? DonateInstruction.toJSON(message.kind?.donate)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DemoInstructionData>, I>>(
    object: I
  ): DemoInstructionData {
    const message = createBaseDemoInstructionData();
    if (
      object.kind?.$case === "echo" &&
      object.kind?.echo !== undefined &&
      object.kind?.echo !== null
    ) {
      message.kind = {
        $case: "echo",
        echo: EchoInstruction.fromPartial(object.kind.echo),
      };
    }
    if (
      object.kind?.$case === "add" &&
      object.kind?.add !== undefined &&
      object.kind?.add !== null
    ) {
      message.kind = {
        $case: "add",
        add: AddInstruction.fromPartial(object.kind.add),
      };
    }
    if (
      object.kind?.$case === "transfer" &&
      object.kind?.transfer !== undefined &&
      object.kind?.transfer !== null
    ) {
      message.kind = {
        $case: "transfer",
        transfer: TransferInstruction.fromPartial(object.kind.transfer),
      };
    }
    if (
      object.kind?.$case === "donate" &&
      object.kind?.donate !== undefined &&
      object.kind?.donate !== null
    ) {
      message.kind = {
        $case: "donate",
        donate: DonateInstruction.fromPartial(object.kind.donate),
      };
    }
    return message;
  },
};

function createBaseEchoInstruction(): EchoInstruction {
  return { str: "" };
}

export const EchoInstruction = {
  encode(
    message: EchoInstruction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.str !== "") {
      writer.uint32(10).string(message.str);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EchoInstruction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEchoInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.str = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EchoInstruction {
    const message = createBaseEchoInstruction();
    message.str =
      object.str !== undefined && object.str !== null ? String(object.str) : "";
    return message;
  },

  toJSON(message: EchoInstruction): unknown {
    const obj: any = {};
    message.str !== undefined && (obj.str = message.str);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EchoInstruction>, I>>(
    object: I
  ): EchoInstruction {
    const message = createBaseEchoInstruction();
    message.str = object.str ?? "";
    return message;
  },
};

function createBaseAddInstruction(): AddInstruction {
  return { a: 0, b: 0 };
}

export const AddInstruction = {
  encode(
    message: AddInstruction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.a !== 0) {
      writer.uint32(8).int32(message.a);
    }
    if (message.b !== 0) {
      writer.uint32(16).int32(message.b);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddInstruction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.int32();
          break;
        case 2:
          message.b = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddInstruction {
    const message = createBaseAddInstruction();
    message.a =
      object.a !== undefined && object.a !== null ? Number(object.a) : 0;
    message.b =
      object.b !== undefined && object.b !== null ? Number(object.b) : 0;
    return message;
  },

  toJSON(message: AddInstruction): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = Math.round(message.a));
    message.b !== undefined && (obj.b = Math.round(message.b));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddInstruction>, I>>(
    object: I
  ): AddInstruction {
    const message = createBaseAddInstruction();
    message.a = object.a ?? 0;
    message.b = object.b ?? 0;
    return message;
  },
};

function createBaseTransferInstruction(): TransferInstruction {
  return { amount: 0 };
}

export const TransferInstruction = {
  encode(
    message: TransferInstruction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amount !== 0) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransferInstruction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransferInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransferInstruction {
    const message = createBaseTransferInstruction();
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Number(object.amount)
        : 0;
    return message;
  },

  toJSON(message: TransferInstruction): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransferInstruction>, I>>(
    object: I
  ): TransferInstruction {
    const message = createBaseTransferInstruction();
    message.amount = object.amount ?? 0;
    return message;
  },
};

function createBaseDonateInstruction(): DonateInstruction {
  return { amount: 0, jarBumpSeed: 0 };
}

export const DonateInstruction = {
  encode(
    message: DonateInstruction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amount !== 0) {
      writer.uint32(8).uint64(message.amount);
    }
    if (message.jarBumpSeed !== 0) {
      writer.uint32(16).uint64(message.jarBumpSeed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DonateInstruction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDonateInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.jarBumpSeed = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DonateInstruction {
    const message = createBaseDonateInstruction();
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Number(object.amount)
        : 0;
    message.jarBumpSeed =
      object.jarBumpSeed !== undefined && object.jarBumpSeed !== null
        ? Number(object.jarBumpSeed)
        : 0;
    return message;
  },

  toJSON(message: DonateInstruction): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.jarBumpSeed !== undefined &&
      (obj.jarBumpSeed = Math.round(message.jarBumpSeed));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DonateInstruction>, I>>(
    object: I
  ): DonateInstruction {
    const message = createBaseDonateInstruction();
    message.amount = object.amount ?? 0;
    message.jarBumpSeed = object.jarBumpSeed ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
