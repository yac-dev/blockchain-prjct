const sha256 = require('sha256');
const Blockchain = function () {
  this.chain = [];
  this.pendingTransactions = []; // これは言わば、pendingな状態のtransactionと見ていい。また、set in stone状態ではないものとみなせる。

  this.createNewBlock(100, '0', '0'); // genesis blockになる。
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

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

// このmethodがとても根幹になってくる。
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    // このsubstringの0,4は4を含めないからね。
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  // これ、かなり計算するね。100,000,000くらいのhash algorithmを実行することも珍しくないだろう。
  return nonce; // これがproofとなる重要なnumber only used onceになる。
};

module.exports = Blockchain;
