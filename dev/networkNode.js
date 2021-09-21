const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2];

// ここのserverが起動したら、その時点でBlockchainのinstanceが出来上がる。

const nodeAddress = uuid().split('-').join(''); // stringの中に、-が入っているから、それを取り除く。
const bitcoin = new Blockchain();

app.use(express.json());

app.get('/blockchain', (request, response) => {
  response.send(bitcoin);
});

app.post('/transaction', (request, response) => {
  const { amount, sender, recipient } = request.body;
  const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);
  response.json({ note: `Transaction WILL be added in block ${blockIndex}.` });
});

app.get('/mine', (request, response) => {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1, // 今作ろうとするblockのindex。
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bitcoin.createNewTransaction(12.5, '0', nodeAddress); // 基本、rewardとして、「このnode instance」にrewardを送る仕組みにする。（nodeのinstanceを増やしていく方向性に行く。） 「このnode」のアドレスとして、uuidで作ったやつを使う。

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
  response.json({
    note: 'New block mined(create) successfully!',
    block: newBlock,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
