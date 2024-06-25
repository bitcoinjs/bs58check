import tape from 'tape'
import { Buffer } from 'safe-buffer'
import createBlakeHash from 'blake-hash'
import bs58checkBase from '../src/esm/base.js'
import { hexToBytes } from '@noble/hashes/utils'

function blake256x2 (buffer) {
  buffer = createBlakeHash('blake256').update(Buffer.from(buffer)).digest()
  return Uint8Array.from(createBlakeHash('blake256').update(buffer).digest())
}

const bs58check = bs58checkBase(blake256x2)

tape('custom checksum function (blake256x2)', function (t) {
  const address = 'DsRLWShUQexhKE1yRdpe2kVH7fmULcEUFDk'
  const payload = hexToBytes('073f0415e993935a68154fda7018b887c4e3fe8b4e10')

  t.equal(bs58check.encode(payload, blake256x2), address)
  t.same(bs58check.decodeUnsafe(address, blake256x2), payload)
  t.same(bs58check.decode(address, blake256x2), payload)

  t.end()
})
