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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var vitest_1 = require("vitest");
var utils_1 = require("../utils");
var demo_1 = require("../../lib/demo");
var promises_1 = __importDefault(require("fs/promises"));
var lodash_1 = __importDefault(require("lodash"));
var state_1 = require("../../generated/programs/demo/state");
(0, vitest_1.describe)("demo instructions", function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, wallet, programId, giveback, demoBuilder;
    return __generator(this, function (_a) {
        connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
        wallet = new web3_js_1.Keypair();
        programId = utils_1.DEMO_PROGRAM_ID;
        giveback = [wallet];
        demoBuilder = new demo_1.DemoInstructionBuilder(connection, wallet, programId);
        console.log("Wallet PK:", wallet.publicKey.toBase58());
        console.log("Program ID:", programId.toBase58());
        // Airdrop
        (0, vitest_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var airdrop, confirmedTX, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        console.log("Getting you some free SOL 😎...");
                        return [4 /*yield*/, connection.requestAirdrop(wallet.publicKey, web3_js_1.LAMPORTS_PER_SOL)];
                    case 1:
                        airdrop = _b.sent();
                        return [4 /*yield*/, connection.confirmTransaction(airdrop)];
                    case 2:
                        confirmedTX = _b.sent();
                        (0, vitest_1.expect)((_a = confirmedTX === null || confirmedTX === void 0 ? void 0 : confirmedTX.value) === null || _a === void 0 ? void 0 : _a.err).toBeNull();
                        console.log("Airdrop confirmed 🚀:", airdrop);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error("Airdrop failed 💥:", err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 100000);
        vitest_1.it.concurrent.skip("tx with echo instruction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var msg, echoInstruction, transaction, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = "Hello from Vitest 🚀";
                        echoInstruction = demoBuilder.echo(msg);
                        transaction = new web3_js_1.Transaction();
                        transaction.add(echoInstruction);
                        return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                                wallet,
                            ])];
                    case 1:
                        tx = _a.sent();
                        (0, vitest_1.expect)(tx).toBeDefined();
                        console.log("[ECHO] TX:", tx);
                        return [2 /*return*/];
                }
            });
        }); });
        vitest_1.it.concurrent.skip("tx with add instruction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var addInstruction, transaction, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addInstruction = demoBuilder.add(13, 37);
                        transaction = new web3_js_1.Transaction();
                        transaction.add(addInstruction);
                        return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                                wallet,
                            ])];
                    case 1:
                        tx = _a.sent();
                        (0, vitest_1.expect)(tx).toBeDefined();
                        console.log("[ADD] TX:", tx);
                        return [2 /*return*/];
                }
            });
        }); });
        vitest_1.it.concurrent.skip("tx with transfer instruction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var to, transferInstruction, transaction, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = new web3_js_1.Keypair();
                        giveback.push(to);
                        transferInstruction = demoBuilder.transfer(to.publicKey, web3_js_1.LAMPORTS_PER_SOL / 2);
                        transaction = new web3_js_1.Transaction();
                        transaction.add(transferInstruction);
                        return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                                wallet,
                            ])];
                    case 1:
                        tx = _a.sent();
                        (0, vitest_1.expect)(tx).toBeDefined();
                        console.log("[TRANSFER] TX:", tx);
                        return [2 /*return*/];
                }
            });
        }); });
        vitest_1.it.concurrent("tx with donate instruction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var donateInstruction, transaction, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, demoBuilder.donate(web3_js_1.LAMPORTS_PER_SOL / 4)];
                    case 1:
                        donateInstruction = _a.sent();
                        transaction = new web3_js_1.Transaction();
                        transaction.add(donateInstruction);
                        return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                                wallet,
                            ])];
                    case 2:
                        tx = _a.sent();
                        (0, vitest_1.expect)(tx).toBeDefined();
                        console.log("[DONATE] TX:", tx);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)("tx with another donation from same owner", function () { return __awaiter(void 0, void 0, void 0, function () {
            var donateInstruction, transaction, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, demoBuilder.donate(web3_js_1.LAMPORTS_PER_SOL / 4)];
                    case 1:
                        donateInstruction = _a.sent();
                        transaction = new web3_js_1.Transaction();
                        transaction.add(donateInstruction);
                        return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
                                wallet,
                            ])];
                    case 2:
                        tx = _a.sent();
                        (0, vitest_1.expect)(tx).toBeDefined();
                        console.log("[DONATE] TX:", tx);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)("has correct data for jar account", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, jarPDA, _b, data, jarAccount, decodedData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from("jar"), wallet.publicKey.toBuffer()], programId)];
                    case 1:
                        _a = __read.apply(void 0, [_c.sent(), 1]), jarPDA = _a[0];
                        return [4 /*yield*/, connection.getAccountInfo(jarPDA)];
                    case 2:
                        _b = _c.sent(), data = _b.data, jarAccount = __rest(_b, ["data"]);
                        console.log(jarAccount);
                        data.slice();
                        promises_1.default.writeFile("./data.json", JSON.stringify(data, null, 2));
                        decodedData = state_1.JarAccountState.decode(data);
                        (0, vitest_1.expect)(jarAccount.lamports).toBe(web3_js_1.LAMPORTS_PER_SOL / 2);
                        (0, vitest_1.expect)(jarAccount.owner).toBe(programId);
                        (0, vitest_1.expect)(jarAccount.executable).toBe(false);
                        (0, vitest_1.expect)(decodedData.authority).toBe(wallet.publicKey.toBase58());
                        (0, vitest_1.expect)(decodedData.donationAmount).toBe(2);
                        (0, vitest_1.expect)(decodedData.lastDonationTime).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
        // Give back all lamports to the system
        (0, vitest_1.afterAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction_1, balancesPromises, index, keypair, balances_1, tx, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("Attempting to give back lamports to the system...");
                        transaction_1 = new web3_js_1.Transaction();
                        balancesPromises = [];
                        for (index = 0; index < giveback.length; index++) {
                            keypair = giveback[index];
                            balancesPromises.push(connection.getBalance(keypair.publicKey));
                        }
                        return [4 /*yield*/, Promise.all(balancesPromises)];
                    case 1:
                        balances_1 = _a.sent();
                        console.log("Giving back ".concat(lodash_1.default.sum(balances_1), " lamports \uD83D\uDE4F..."));
                        giveback.forEach(function (keypair, index) {
                            transaction_1.add(web3_js_1.SystemProgram.transfer({
                                fromPubkey: keypair.publicKey,
                                lamports: balances_1[index] - utils_1.MAYBE_FEE,
                                toPubkey: utils_1.AIRDROP_KEY,
                            }));
                        });
                        return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction_1, giveback)];
                    case 2:
                        tx = _a.sent();
                        console.log("Gave back all lamports to the system 🚀:", tx);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.error(err_2);
                        console.log("Could not give back lamports to the system :(");
                        console.log("Please manually give back lamports to the system, saved keys data to ./giveback.json");
                        promises_1.default.writeFile("giveback.json", JSON.stringify(giveback, null, 2));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 100000);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=instructions.test.js.map