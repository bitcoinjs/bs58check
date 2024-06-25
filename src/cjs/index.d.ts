declare const _default: {
    encode: (payload: Uint8Array | number[]) => string;
    decode: (str: string) => Uint8Array;
    decodeUnsafe: (str: string) => Uint8Array | undefined;
};
export default _default;
