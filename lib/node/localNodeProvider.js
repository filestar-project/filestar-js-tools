const LotusRpcEngine = require('@glif/filecoin-rpc-client')

class LocalNodeProvider {
  constructor({ apiAddress, token }) {
    this.apiAddress = apiAddress
    this.token = token
    this.jsonRpcEngine = new LotusRpcEngine({ apiAddress, token })
  }

  estimateGas = (...params) => this.jsonRpcEngine.request('GasEstimateMessageGas', ...params)
}

export default LocalNodeProvider
