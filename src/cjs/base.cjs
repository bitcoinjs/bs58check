'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var bs58_1 = __importDefault(require("bs58"));
function default_1(checksumFn) {
    // Encode a buffer as a base58-check encoded string
    function encode(payload) {
        var payloadU8 = Uint8Array.from(payload);
        var checksum = checksumFn(payloadU8);
        var length = payloadU8.length + 4;
        var both = new Uint8Array(length);
        both.set(payloadU8, 0);
        both.set(checksum.subarray(0, 4), payloadU8.length);
        return bs58_1.default.encode(both);
    }
    function decodeRaw(buffer) {
        var payload = buffer.slice(0, -4);
        var checksum = buffer.slice(-4);
        var newChecksum = checksumFn(payload);
        // eslint-disable-next-line
        if (checksum[0] ^ newChecksum[0] |
            checksum[1] ^ newChecksum[1] |
            checksum[2] ^ newChecksum[2] |
            checksum[3] ^ newChecksum[3])
            return;
        return payload;
    }
    // Decode a base58-check encoded string to a buffer, no result if checksum is wrong
    function decodeUnsafe(str) {
        var buffer = bs58_1.default.decodeUnsafe(str);
        if (buffer == null)
            return;
        return decodeRaw(buffer);
    }
    function decode(str) {
        var buffer = bs58_1.default.decode(str);
        var payload = decodeRaw(buffer);
        if (payload == null)
            throw new Error('Invalid checksum');
        return payload;
    }
    return {
        encode: encode,
        decode: decode,
        decodeUnsafe: decodeUnsafe
    };
}
