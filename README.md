# filestar-js-tools
FileStar address generating &amp; message signing tools for javascript version

# Warning
This repo is still under developing. 

# Install

```
npm i filestar-js-tools --save
```

# Usage

### Generating a random address and return its private key & seed words:
```
const filestar = require('filestar-js-tools')


const { address, privateKey, mnemonic } = filestar.generateAddress()
console.log(address, privateKey, mnemonic)
```

### Sign message

Coming soon

### Send transaction

Coming soon
