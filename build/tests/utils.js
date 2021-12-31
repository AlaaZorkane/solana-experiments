"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAYBE_FEE = exports.AIRDROP_KEY = exports.DEMO_PROGRAM_ID = void 0;
var web3_js_1 = require("@solana/web3.js");
exports.DEMO_PROGRAM_ID = new web3_js_1.PublicKey("2G6M4rDxMTHavf3JwS3XVEuDLokJTeDNok43W29LVZZJ");
// to give back airdrops when tests end
exports.AIRDROP_KEY = new web3_js_1.PublicKey("9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g");
// Can also be deterministcally calculated but eh 3gzt
exports.MAYBE_FEE = 15000;
//# sourceMappingURL=utils.js.map