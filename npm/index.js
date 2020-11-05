const { encode, newAddress, validateAddressString } = require('./address')
const bip32 = require('bip32')
const secp256k1 = require('secp256k1')
const { blake2b } = require('blakejs')
const bip39 = require('bip39')

function generateAddressFromMnemonicWords(mnemonic, prefix) {
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
    const privateKey = Buffer.from(privKey).toString('hex')
    if (validateAddressString(address)) {
      return { privateKey, address }
    } else {
      return null
    }
  } else {
    return null
  }
}
exports.generateAddressFromMnemonicWords = generateAddressFromMnemonicWords

function generateAddressFromPrivateKey(privateKey, prefix) {
  const privKeyBuff = Buffer.from(privateKey, 'hex')
  if (privKeyBuff == null) {
    return null
  }
  const privKey = Uint8Array.from(privKeyBuff)
  if (secp256k1.privateKeyVerify(privKey)) {
    // get the public key in an uncompressed format
    const pubKey = secp256k1.publicKeyCreate(privKey, false)
    const hash = blake2b(pubKey, null, 20)

    const protocol = newAddress(1, Buffer.from(hash))
    const networkPrefix = prefix || 'f'
    const address = encode(networkPrefix, protocol)
    const privateKey = Buffer.from(privKey).toString('hex')

    if (validateAddressString(address)) {
      return { privateKey, address }
    } else {
      return null
    }
  } else {
    return null
  }
}
exports.generateAddressFromPrivateKey = generateAddressFromPrivateKey

