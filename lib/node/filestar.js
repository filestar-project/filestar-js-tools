const Filecoin = require('@glif/filecoin-wallet-provider')
const LocalNodeProvider = require('./localNodeProvider')

const config = {
  apiAddress: 'YOUR FILESTAR RPC ADDERSS',
  token: 'YOUR RPC JWT TOKEN' // required
}
export const LotusNode = new LocalNodeProvider(config)
export const filestar = new Filecoin(LotusNode, config)
