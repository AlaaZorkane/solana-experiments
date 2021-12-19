/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface DemoInstructionData {
  echo: EchoInstruction | undefined;
  add: AddInstruction | undefined;
}

export interface EchoInstruction {
  str: string;
}

export interface AddInstruction {
  a: number;
  b: number;
}

const baseDemoInstructionData: object = {};

export const DemoInstructionData = {
  encode(
    message: DemoInstructionData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.echo !== undefined) {
      EchoInstruction.encode(message.echo, writer.uint32(10).fork()).ldelim();
    }
    if (message.add !== undefined) {
      AddInstruction.encode(message.add, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DemoInstructionData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDemoInstructionData } as DemoInstructionData;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.echo = EchoInstruction.decode(reader, reader.uint32());
          break;
        case 2:
          message.add = AddInstruction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DemoInstructionData {
    const message = { ...baseDemoInstructionData } as DemoInstructionData;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? EchoInstruction.fromJSON(object.echo)
        : undefined;
    message.add =
      object.add !== undefined && object.add !== null
        ? AddInstruction.fromJSON(object.add)
        : undefined;
    return message;
  },

  toJSON(message: DemoInstructionData): unknown {
    const obj: any = {};
    message.echo !== undefined &&
      (obj.echo = message.echo
        ? EchoInstruction.toJSON(message.echo)
        : undefined);
    message.add !== undefined &&
      (obj.add = message.add ? AddInstruction.toJSON(message.add) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DemoInstructionData>, I>>(
    object: I
  ): DemoInstructionData {
    const message = { ...baseDemoInstructionData } as DemoInstructionData;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? EchoInstruction.fromPartial(object.echo)
        : undefined;
    message.add =
      object.add !== undefined && object.add !== null
        ? AddInstruction.fromPartial(object.add)
        : undefined;
    return message;
  },
};

const baseEchoInstruction: object = { str: "" };

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
    const message = { ...baseEchoInstruction } as EchoInstruction;
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
    const message = { ...baseEchoInstruction } as EchoInstruction;
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
    const message = { ...baseEchoInstruction } as EchoInstruction;
    message.str = object.str ?? "";
    return message;
  },
};

const baseAddInstruction: object = { a: 0, b: 0 };

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
    const message = { ...baseAddInstruction } as AddInstruction;
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
    const message = { ...baseAddInstruction } as AddInstruction;
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
    const message = { ...baseAddInstruction } as AddInstruction;
    message.a = object.a ?? 0;
    message.b = object.b ?? 0;
    return message;
  },
};

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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
