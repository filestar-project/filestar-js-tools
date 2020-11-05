const Filecoin = require('@glif/filecoin-wallet-provider')
const LocalNodeProvider = require('./localNodeProvider')

const config = {
  apiAddress: 'https://filfox.info/rpc/v0',
  token: 'FILFOX' // required
}
export const LotusNode = new LocalNodeProvider(config)
export const filestar = new Filecoin(LotusNode, config)
