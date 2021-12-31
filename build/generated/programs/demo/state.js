"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JarAccountState = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "";
function createBaseJarAccountState() {
    return { authority: "", donationAmount: 0, lastDonationTime: 0 };
}
exports.JarAccountState = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
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
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseJarAccountState();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.donationAmount = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.lastDonationTime = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = createBaseJarAccountState();
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
    toJSON: function (message) {
        var obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        message.donationAmount !== undefined &&
            (obj.donationAmount = Math.round(message.donationAmount));
        message.lastDonationTime !== undefined &&
            (obj.lastDonationTime = Math.round(message.lastDonationTime));
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseJarAccountState();
        message.authority = (_a = object.authority) !== null && _a !== void 0 ? _a : "";
        message.donationAmount = (_b = object.donationAmount) !== null && _b !== void 0 ? _b : 0;
        message.lastDonationTime = (_c = object.lastDonationTime) !== null && _c !== void 0 ? _c : 0;
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
//# sourceMappingURL=state.js.map