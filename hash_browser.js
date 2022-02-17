var sha256 = require('js-sha256').sha256
module.exports = function sha256x2 (payload) {
  var tmp = sha256.create().update(payload).arrayBuffer()
  return new Uint8Array(sha256.create().update(tmp).arrayBuffer())
}
