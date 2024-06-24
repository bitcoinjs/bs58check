import bs58check from '../src/esm/index.js'
import fixtures from './fixtures.json' assert { type: 'json' }
import tape from 'tape'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'

const { decode, decodeUnsafe, encode } = bs58check
const { valid, invalid } = fixtures

valid.forEach(function (f) {
  tape('decodes ' + f.string, function (t) {
    t.plan(2)
    var actual = bytesToHex(decode(f.string))
    t.equal(actual, f.payload)

    actual = bytesToHex(decodeUnsafe(f.string))
    t.equal(actual, f.payload)
  })
})

invalid.forEach(function (f) {
  tape('decode throws on ' + f.string, function (t) {
    t.plan(2)
    t.throws(function () {
      decode(f.string)
    }, new RegExp(f.exception))

    t.equal(decodeUnsafe(f.string), undefined)
  })
})

valid.forEach(function (f) {
  tape('encodes ' + f.string, function (t) {
    t.plan(3)
    var u8 = hexToBytes(f.payload)
    var array = Array.from(u8)
    var buffer = Buffer.from(u8)
    var actual1 = encode(u8)
    var actual2 = encode(array)
    var actual3 = encode(buffer)

    t.equal(actual1, f.string)
    t.equal(actual2, f.string)
    t.equal(actual3, f.string)
  })
})
