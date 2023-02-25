/// <reference types="node" />

declare const bs58check: {
    encode(buffer: Buffer | number[] | Uint8Array): string;
    decodeUnsafe(string: string): Uint8Array | undefined;
    decode(string: string): Uint8Array;
};

export = bs58check;
