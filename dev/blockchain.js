const Blockchain = function () {
  this.chain = [];
  this.newTransactions = [];
};
// これが、根本のdata structureになる。

Blockchain.prototype.createNewBlock = function (
  nonce,
  previousBlockHash,
  hash
) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.newTransactions,
    nonce: nonce,
    previousBlockHash: previousBlockHash,
    hash: hash,
  };

  this.newTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
};

const bc = new Blockchain();
console.log(bc);
