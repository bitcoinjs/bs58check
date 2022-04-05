'use strict'

var hasher = require('./hash')
var bs58checkBase = require('./base')

module.exports = bs58checkBase(hasher)
