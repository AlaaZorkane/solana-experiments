import { PublicKey } from "@solana/web3.js";

export const DEMO_PROGRAM_ID = new PublicKey(
  "2G6M4rDxMTHavf3JwS3XVEuDLokJTeDNok43W29LVZZJ"
);

// to give back airdrops when tests end
export const AIRDROP_KEY = new PublicKey(
  "9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g"
);

// Can also be deterministcally calculated but eh 3gzt
export const MAYBE_FEE = 15_000;
