"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoInstructionBuilder = void 0;
var web3_js_1 = require("@solana/web3.js");
var instructions_1 = require("../generated/programs/demo/instructions");
// TODO: Is there a way to programmatically generate this?
var DemoInstructionBuilder = /** @class */ (function () {
    function DemoInstructionBuilder(connection, wallet, programId) {
        this.connection = connection;
        this.wallet = wallet;
        this.programId = programId;
        this.connection = connection;
        this.wallet = wallet;
    }
    DemoInstructionBuilder.prototype.echo = function (message) {
        var echoInstructionData = instructions_1.DemoInstructionData.encode({
            kind: {
                $case: "echo",
                echo: {
                    str: message,
                },
            },
        }).finish();
        var keys = [
            {
                pubkey: this.wallet.publicKey,
                isSigner: true,
                isWritable: false,
            },
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: this.programId,
            data: Buffer.from(echoInstructionData),
        });
    };
    DemoInstructionBuilder.prototype.add = function (a, b) {
        var addInstructionData = instructions_1.DemoInstructionData.encode({
            kind: {
                $case: "add",
                add: {
                    a: a,
                    b: b,
                },
            },
        }).finish();
        var keys = [
            {
                pubkey: this.wallet.publicKey,
                isSigner: true,
                isWritable: false,
            },
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: this.programId,
            data: Buffer.from(addInstructionData),
        });
    };
    DemoInstructionBuilder.prototype.transfer = function (to, amount) {
        var transferInstructionData = instructions_1.DemoInstructionData.encode({
            kind: {
                $case: "transfer",
                transfer: {
                    amount: amount,
                },
            },
        }).finish();
        var keys = [
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
                pubkey: web3_js_1.SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new web3_js_1.TransactionInstruction({
            keys: keys,
            programId: this.programId,
            data: Buffer.from(transferInstructionData),
        });
    };
    DemoInstructionBuilder.prototype.donate = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, jarPDA, jarBumpSeed, donateInstructionData, keys;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from("jar"), this.wallet.publicKey.toBuffer()], this.programId)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 2]), jarPDA = _a[0], jarBumpSeed = _a[1];
                        donateInstructionData = instructions_1.DemoInstructionData.encode({
                            kind: {
                                $case: "donate",
                                donate: {
                                    amount: amount,
                                    jarBumpSeed: jarBumpSeed,
                                },
                            },
                        }).finish();
                        keys = [
                            {
                                pubkey: this.wallet.publicKey,
                                isSigner: true,
                                isWritable: true,
                            },
                            {
                                pubkey: jarPDA,
                                isSigner: false,
                                isWritable: true,
                            },
                            {
                                pubkey: web3_js_1.SystemProgram.programId,
                                isSigner: false,
                                isWritable: false,
                            },
                        ];
                        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                                keys: keys,
                                programId: this.programId,
                                data: Buffer.from(donateInstructionData),
                            })];
                }
            });
        });
    };
    return DemoInstructionBuilder;
}());
exports.DemoInstructionBuilder = DemoInstructionBuilder;
//# sourceMappingURL=demo.js.map