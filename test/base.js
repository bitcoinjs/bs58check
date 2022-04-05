var tape = require('tape')
var createBlakeHash = require('blake-hash')
var bs58checkBase = require('../base')

function blake256x2 (buffer) {
  buffer = createBlakeHash('blake256').update(Buffer.from(buffer)).digest()
  return createBlakeHash('blake256').update(buffer).digest()
}

var bs58check = bs58checkBase(blake256x2)

tape('custom checksum function (blake256x2)', function (t) {
  const address = 'DsRLWShUQexhKE1yRdpe2kVH7fmULcEUFDk'
  const payload = Uint8Array.from(Buffer.from('073f0415e993935a68154fda7018b887c4e3fe8b4e10', 'hex'))

  t.equal(bs58check.encode(payload), address)
  t.same(bs58check.decodeUnsafe(address), payload)
  t.same(bs58check.decode(address), payload)

  t.end()
})
