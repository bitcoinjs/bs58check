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
    t.plan(1)
    var actual = bs58check.encode(hexToBytes(f.payload))

    t.equal(actual, f.string)
  })
})
