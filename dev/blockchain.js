const Blockchain = function () {
  this.chain = [];
  this.pendingTransactions = []; // これは言わば、pendingな状態のtransactionと見ていい。また、set in stone状態ではないものとみなせる。
};
// これが、根本のdata structureになる。

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    previousBlockHash: previousBlockHash,
    hash: hash,
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
  };
  this.pendingTransactions.push(newTransaction);
  return this.getLastBlock['index'] + 1; // これにより、作られたtransactionが次に来るべき番号が決まる。
};

module.exports = Blockchain;
