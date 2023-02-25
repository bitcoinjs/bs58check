'use strict'

var { sha256 } = require('@noble/hashes/sha256')
var bs58checkBase = require('./base')

// SHA256(SHA256(buffer))
function sha256x2 (buffer) {
  return sha256(sha256(buffer))
}

module.exports = bs58checkBase(sha256x2)
