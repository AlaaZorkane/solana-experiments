// Workaround until this is merged: https://github.com/stephenh/ts-proto/pull/460

import { JarAccountState } from "../generated/programs/demo/state";
import { Reader, Writer } from "protobufjs/minimal";

export const encoderDelimited = <T = any>(proto: any, message: T) => {
  const encoded: Writer = proto.encode(message);

  encoded.ldelim();

  return encoded.finish();
};

export const decoderDelimited = <T = any>(proto: any, encoded: Uint8Array) => {
  const reader = new Reader(encoded);
  const length = reader.int32();
  const decoded: T = proto.decode(reader, length);

  return decoded;
};
