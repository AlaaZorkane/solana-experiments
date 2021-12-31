// To try random stuff

import { JarAccountState } from "./generated/programs/demo/state";
import { decoderDelimited, encoderDelimited } from "./lib/delimitedProto";

async function sandbox() {
  const encoded = encoderDelimited<JarAccountState>(JarAccountState, {
    authority: "xo!!",
    donationAmount: 23,
    lastDonationTime: Date.now(),
  });

  // const test = new Uint8Array(1024);
  // test.set(encoded);

  const decoded = decoderDelimited<JarAccountState>(JarAccountState, test);

  console.log(decoded);
}

void sandbox().catch(console.error);
