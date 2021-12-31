"use strict";
// Workaround until this is merged: https://github.com/stephenh/ts-proto/pull/460
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoderDelimited = exports.encoderDelimited = void 0;
var minimal_1 = require("protobufjs/minimal");
var encoderDelimited = function (proto, message) {
    var encoded = proto.encode(message);
    encoded.ldelim();
    return encoded.finish();
};
exports.encoderDelimited = encoderDelimited;
var decoderDelimited = function (proto, encoded) {
    var reader = new minimal_1.Reader(encoded);
    var length = reader.int32();
    var decoded = proto.decode(reader, length);
    return decoded;
};
exports.decoderDelimited = decoderDelimited;
//# sourceMappingURL=delimitedProto.js.map