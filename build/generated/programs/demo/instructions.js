"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonateInstruction = exports.TransferInstruction = exports.AddInstruction = exports.EchoInstruction = exports.DemoInstructionData = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "";
function createBaseDemoInstructionData() {
    return { kind: undefined };
}
exports.DemoInstructionData = {
    encode: function (message, writer) {
        var _a, _b, _c, _d;
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (((_a = message.kind) === null || _a === void 0 ? void 0 : _a.$case) === "echo") {
            exports.EchoInstruction.encode(message.kind.echo, writer.uint32(10).fork()).ldelim();
        }
        if (((_b = message.kind) === null || _b === void 0 ? void 0 : _b.$case) === "add") {
            exports.AddInstruction.encode(message.kind.add, writer.uint32(18).fork()).ldelim();
        }
        if (((_c = message.kind) === null || _c === void 0 ? void 0 : _c.$case) === "transfer") {
            exports.TransferInstruction.encode(message.kind.transfer, writer.uint32(26).fork()).ldelim();
        }
        if (((_d = message.kind) === null || _d === void 0 ? void 0 : _d.$case) === "donate") {
            exports.DonateInstruction.encode(message.kind.donate, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseDemoInstructionData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.kind = {
                        $case: "echo",
                        echo: exports.EchoInstruction.decode(reader, reader.uint32()),
                    };
                    break;
                case 2:
                    message.kind = {
                        $case: "add",
                        add: exports.AddInstruction.decode(reader, reader.uint32()),
                    };
                    break;
                case 3:
                    message.kind = {
                        $case: "transfer",
                        transfer: exports.TransferInstruction.decode(reader, reader.uint32()),
                    };
                    break;
                case 4:
                    message.kind = {
                        $case: "donate",
                        donate: exports.DonateInstruction.decode(reader, reader.uint32()),
                    };
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = createBaseDemoInstructionData();
        if (object.echo !== undefined && object.echo !== null) {
            message.kind = {
                $case: "echo",
                echo: exports.EchoInstruction.fromJSON(object.echo),
            };
        }
        if (object.add !== undefined && object.add !== null) {
            message.kind = { $case: "add", add: exports.AddInstruction.fromJSON(object.add) };
        }
        if (object.transfer !== undefined && object.transfer !== null) {
            message.kind = {
                $case: "transfer",
                transfer: exports.TransferInstruction.fromJSON(object.transfer),
            };
        }
        if (object.donate !== undefined && object.donate !== null) {
            message.kind = {
                $case: "donate",
                donate: exports.DonateInstruction.fromJSON(object.donate),
            };
        }
        return message;
    },
    toJSON: function (message) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var obj = {};
        ((_a = message.kind) === null || _a === void 0 ? void 0 : _a.$case) === "echo" &&
            (obj.echo = ((_b = message.kind) === null || _b === void 0 ? void 0 : _b.echo)
                ? exports.EchoInstruction.toJSON((_c = message.kind) === null || _c === void 0 ? void 0 : _c.echo)
                : undefined);
        ((_d = message.kind) === null || _d === void 0 ? void 0 : _d.$case) === "add" &&
            (obj.add = ((_e = message.kind) === null || _e === void 0 ? void 0 : _e.add)
                ? exports.AddInstruction.toJSON((_f = message.kind) === null || _f === void 0 ? void 0 : _f.add)
                : undefined);
        ((_g = message.kind) === null || _g === void 0 ? void 0 : _g.$case) === "transfer" &&
            (obj.transfer = ((_h = message.kind) === null || _h === void 0 ? void 0 : _h.transfer)
                ? exports.TransferInstruction.toJSON((_j = message.kind) === null || _j === void 0 ? void 0 : _j.transfer)
                : undefined);
        ((_k = message.kind) === null || _k === void 0 ? void 0 : _k.$case) === "donate" &&
            (obj.donate = ((_l = message.kind) === null || _l === void 0 ? void 0 : _l.donate)
                ? exports.DonateInstruction.toJSON((_m = message.kind) === null || _m === void 0 ? void 0 : _m.donate)
                : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var message = createBaseDemoInstructionData();
        if (((_a = object.kind) === null || _a === void 0 ? void 0 : _a.$case) === "echo" &&
            ((_b = object.kind) === null || _b === void 0 ? void 0 : _b.echo) !== undefined &&
            ((_c = object.kind) === null || _c === void 0 ? void 0 : _c.echo) !== null) {
            message.kind = {
                $case: "echo",
                echo: exports.EchoInstruction.fromPartial(object.kind.echo),
            };
        }
        if (((_d = object.kind) === null || _d === void 0 ? void 0 : _d.$case) === "add" &&
            ((_e = object.kind) === null || _e === void 0 ? void 0 : _e.add) !== undefined &&
            ((_f = object.kind) === null || _f === void 0 ? void 0 : _f.add) !== null) {
            message.kind = {
                $case: "add",
                add: exports.AddInstruction.fromPartial(object.kind.add),
            };
        }
        if (((_g = object.kind) === null || _g === void 0 ? void 0 : _g.$case) === "transfer" &&
            ((_h = object.kind) === null || _h === void 0 ? void 0 : _h.transfer) !== undefined &&
            ((_j = object.kind) === null || _j === void 0 ? void 0 : _j.transfer) !== null) {
            message.kind = {
                $case: "transfer",
                transfer: exports.TransferInstruction.fromPartial(object.kind.transfer),
            };
        }
        if (((_k = object.kind) === null || _k === void 0 ? void 0 : _k.$case) === "donate" &&
            ((_l = object.kind) === null || _l === void 0 ? void 0 : _l.donate) !== undefined &&
            ((_m = object.kind) === null || _m === void 0 ? void 0 : _m.donate) !== null) {
            message.kind = {
                $case: "donate",
                donate: exports.DonateInstruction.fromPartial(object.kind.donate),
            };
        }
        return message;
    },
};
function createBaseEchoInstruction() {
    return { str: "" };
}
exports.EchoInstruction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.str !== "") {
            writer.uint32(10).string(message.str);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseEchoInstruction();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        var message = createBaseEchoInstruction();
        message.str =
            object.str !== undefined && object.str !== null ? String(object.str) : "";
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.str !== undefined && (obj.str = message.str);
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseEchoInstruction();
        message.str = (_a = object.str) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseAddInstruction() {
    return { a: 0, b: 0 };
}
exports.AddInstruction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.a !== 0) {
            writer.uint32(8).int32(message.a);
        }
        if (message.b !== 0) {
            writer.uint32(16).int32(message.b);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseAddInstruction();
        while (reader.pos < end) {
            var tag = reader.uint32();
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
    fromJSON: function (object) {
        var message = createBaseAddInstruction();
        message.a =
            object.a !== undefined && object.a !== null ? Number(object.a) : 0;
        message.b =
            object.b !== undefined && object.b !== null ? Number(object.b) : 0;
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.a !== undefined && (obj.a = Math.round(message.a));
        message.b !== undefined && (obj.b = Math.round(message.b));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseAddInstruction();
        message.a = (_a = object.a) !== null && _a !== void 0 ? _a : 0;
        message.b = (_b = object.b) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseTransferInstruction() {
    return { amount: 0 };
}
exports.TransferInstruction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.amount !== 0) {
            writer.uint32(8).uint64(message.amount);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTransferInstruction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = createBaseTransferInstruction();
        message.amount =
            object.amount !== undefined && object.amount !== null
                ? Number(object.amount)
                : 0;
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.amount !== undefined && (obj.amount = Math.round(message.amount));
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseTransferInstruction();
        message.amount = (_a = object.amount) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseDonateInstruction() {
    return { amount: 0, jarBumpSeed: 0 };
}
exports.DonateInstruction = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.amount !== 0) {
            writer.uint32(8).uint64(message.amount);
        }
        if (message.jarBumpSeed !== 0) {
            writer.uint32(16).uint64(message.jarBumpSeed);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseDonateInstruction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.jarBumpSeed = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = createBaseDonateInstruction();
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
    toJSON: function (message) {
        var obj = {};
        message.amount !== undefined && (obj.amount = Math.round(message.amount));
        message.jarBumpSeed !== undefined &&
            (obj.jarBumpSeed = Math.round(message.jarBumpSeed));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseDonateInstruction();
        message.amount = (_a = object.amount) !== null && _a !== void 0 ? _a : 0;
        message.jarBumpSeed = (_b = object.jarBumpSeed) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
var globalThis = (function () {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=instructions.js.map