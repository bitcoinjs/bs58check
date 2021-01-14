/// <reference types="node" />

declare const bs58check: {
    encode: (payload: Buffer) => string;
    decode: (string: string) => Buffer;
    decodeUnsafe: (string: string) => Buffer | undefined;
};

export = bs58check;
