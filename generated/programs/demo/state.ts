/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface JarAccountState {
  /** Pubkey of the account. base58 encoded. */
  authority: string;
  /** How many times the owner donated. */
  donationAmount: number;
  /** last time the owner donated. (unix timestamp) */
  lastDonationTime: number;
}

const baseJarAccountState: object = {
  authority: "",
  donationAmount: 0,
  lastDonationTime: 0,
};

export const JarAccountState = {
  encode(
    message: JarAccountState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.donationAmount !== 0) {
      writer.uint32(16).uint64(message.donationAmount);
    }
    if (message.lastDonationTime !== 0) {
      writer.uint32(24).int64(message.lastDonationTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JarAccountState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJarAccountState } as JarAccountState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.donationAmount = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.lastDonationTime = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JarAccountState {
    const message = { ...baseJarAccountState } as JarAccountState;
    message.authority =
      object.authority !== undefined && object.authority !== null
        ? String(object.authority)
        : "";
    message.donationAmount =
      object.donationAmount !== undefined && object.donationAmount !== null
        ? Number(object.donationAmount)
        : 0;
    message.lastDonationTime =
      object.lastDonationTime !== undefined && object.lastDonationTime !== null
        ? Number(object.lastDonationTime)
        : 0;
    return message;
  },

  toJSON(message: JarAccountState): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.donationAmount !== undefined &&
      (obj.donationAmount = Math.round(message.donationAmount));
    message.lastDonationTime !== undefined &&
      (obj.lastDonationTime = Math.round(message.lastDonationTime));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JarAccountState>, I>>(
    object: I
  ): JarAccountState {
    const message = { ...baseJarAccountState } as JarAccountState;
    message.authority = object.authority ?? "";
    message.donationAmount = object.donationAmount ?? 0;
    message.lastDonationTime = object.lastDonationTime ?? 0;
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
