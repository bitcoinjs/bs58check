var test = require('tape').test
var base58check = require('../')

var fixtures = require('./fixtures')

test('decode', function (t) {
  fixtures.valid.forEach(function (f) {
    t.test('can decode ' + f.string, function (t) {
      t.same(base58check.decode(f.string).toString('hex'), f.payload)
      t.end()
    })
  })

  fixtures.invalid.forEach(function (f) {
    t.test('throws on ' + f, function (t) {
      t.throws(function () {
        base58check.decode(f)
      }, /^Error: Invalid checksum$/)
      t.end()
    })
  })

  t.end()
})

test('encode', function (t) {
  fixtures.valid.forEach(function (f) {
    t.test('can encode ' + f.string, function (t) {
      t.same(base58check.encode(new Buffer(f.payload, 'hex')), f.string)
      t.end()
    })
  })
})
