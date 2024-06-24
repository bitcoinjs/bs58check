'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sha256_1 = require("@noble/hashes/sha256");
var base_js_1 = __importDefault(require("./base.cjs"));
// SHA256(SHA256(buffer))
function sha256x2(buffer) {
    return (0, sha256_1.sha256)((0, sha256_1.sha256)(buffer));
}
exports.default = (0, base_js_1.default)(sha256x2);
