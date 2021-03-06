const CryptoJS = require('crypto-js');
const print = require('json-colorz');

function hash(args) {
  var allValues = '';
  args.forEach((arg) => allValues += arg + ' ');
  console.log('hashing: ' + allValues);
  return CryptoJS.SHA256(allValues).toString();
}

class SimpleTx  {
  constructor() {
    this.txHash = '';
    this.inputs = [];
    this.outputs = [];
  }

  addInput(txHash, index) {
    this.inputs.push({txHash, index});
  }

  addOutput(recipient, value) {
    this.outputs.push({recipient, value});
  }

  hash() {
    var all = [];
    this.inputs.forEach(i => all.push(i.txHash, i.index));
    this.outputs.forEach(o => all.push(o.recipient, o.value));
    this.txHash = hash(all);
  }
}

class SimpleMerkleTree {
  constructor() {
    this.merkleRoot = '';
    this.txs = [];
  }
  add(tx) {
    this.txs.push(tx);
    var txHashes = [];
    this.txs.forEach(tx => txHashes.push(tx.txHash));
    this.merkleRoot = hash(txHashes);
  }
}

var coinbase = new SimpleTx();
coinbase.addOutput('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 50);
coinbase.hash();

var secondTx = new SimpleTx();
secondTx.addInput(coinbase.txHash, 0);
secondTx.addOutput('13wU6wmLoBshNqmBi9Ur8e92eF1eH3kxPP', 30);
secondTx.addOutput('1GVW6vDdwdfqoswio1VQ8HaCRFQN3U9hqz', 20);
secondTx.hash();

tree = new SimpleMerkleTree();
tree.add(coinbase);
tree.add(secondTx);
console.log('SimpleMerkleTree');
print(tree);
