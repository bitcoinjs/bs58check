export default function (checksumFn: (payload: Uint8Array | string) => Uint8Array): {
    encode: (payload: Uint8Array | number[]) => string;
    decode: (str: string) => Uint8Array;
    decodeUnsafe: (str: string) => Uint8Array | undefined;
};
