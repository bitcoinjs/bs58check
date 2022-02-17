var crypto = require('crypto')
module.exports = function sha256x2 (payload) {
  var tmp = crypto.createHash('sha256').update(Buffer.from(payload)).digest()
  return Uint8Array.from(crypto.createHash('sha256').update(tmp).digest())
}
