const { encode, newAddress, validateAddressString } = require('./lib/address')
const bip32 = require('bip32')
const secp256k1 = require('secp256k1')
const { blake2b } = require('blakejs')
const bip39 = require('bip39')

function generateAddress(prefix) {
  const mnemonic = bip39.generateMnemonic()
  const seed = bip39.mnemonicToSeedSync(mnemonic)
  const res = bip32.fromSeed(seed)
  const privKey = res.__D
  if (secp256k1.privateKeyVerify(privKey)) {
    // get the public key in an uncompressed format
    const pubKey = secp256k1.publicKeyCreate(privKey, false)
    const hash = blake2b(pubKey, null, 20)

    const protocol = newAddress(1, Buffer.from(hash))
    const networkPrefix = prefix || 'f'
    const address = encode(networkPrefix, protocol)
    const privateKey = Buffer.from(privKey).toString('base64')
    if (validateAddressString(address)) {
      return { address, privateKey, mnemonic }
    } else {
      return null
    }
  } else {
    return null
  }
}
exports.generateAddress = generateAddress

