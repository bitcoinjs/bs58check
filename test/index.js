var bs58check = require('../')
var fixtures = require('./fixtures')
var tape = require('tape')
var { bytesToHex, hexToBytes } = require('@noble/hashes/utils')

fixtures.valid.forEach(function (f) {
  tape('decodes ' + f.string, function (t) {
    t.plan(2)
    var actual = bytesToHex(bs58check.decode(f.string))
    t.equal(actual, f.payload)

    actual = bytesToHex(bs58check.decodeUnsafe(f.string))
    t.equal(actual, f.payload)
  })
})

fixtures.invalid.forEach(function (f) {
  tape('decode throws on ' + f.string, function (t) {
    t.plan(2)
    t.throws(function () {
      bs58check.decode(f.string)
    }, new RegExp(f.exception))

    t.equal(bs58check.decodeUnsafe(f.string), undefined)
  })
})

fixtures.valid.forEach(function (f) {
  tape('encodes ' + f.string, function (t) {
    t.plan(3)
    var u8 = hexToBytes(f.payload)
    var array = Array.from(u8)
    var buffer = Buffer.from(u8)
    var actual1 = bs58check.encode(u8)
    var actual2 = bs58check.encode(array)
    var actual3 = bs58check.encode(buffer)

    t.equal(actual1, f.string)
    t.equal(actual2, f.string)
    t.equal(actual3, f.string)
  })
})
