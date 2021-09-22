const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2];
const requestPromise = require('request-promise');

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

app.post('/register-and-broadcast-node', (request, response) => {
  // ここで、node instanceをnetworkへ参加していくapi endpointになる。
  const { newNodeUrl } = request.body;

  if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) bitcoin.networkNodes.push(newNodeUrl); // 要は、network arrayの中にこのurlがなかったら追加していく、っていうこと。もう少し分かりやすい書き方がある。まあ、一応これで沿っておこう。
  console.log(bitcoin.networkNodes); //一応ここで、localhost3002がはいっていることは確認できる。
  const regNodesPromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    console.log(networkNodeUrl); // ここでもlocalhost:3002は確認できる。
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };

    regNodesPromises.push(requestPromise(requestOptions));

    Promise.all(regNodesPromises)
      .then(
        (data) => {
          console.log(networkNodeUrl);
          const bulkRegisterOptions = {
            uri: networkNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
            json: true,
          };
          return requestPromise(bulkRegisterOptions);
        },
        (error1) => {
          console.log(error1);
        }
      )
      .then(
        (data) => {
          response.json({
            note: 'New Note Registered with network successfully',
          });
        },
        (error2) => {
          console.log(error2);
        }
      );
  });
});

app.post('/register-node', (request, response) => {
  // ここでは、network参加申し込みをしてきたnodeを、実際にnetworkに追加していく。
  const { newNodeUrl } = request.body; // このnewNodeurlっていうのは、送り先か。。。
  if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1 && bitcoin.currentNodeUrl !== newNodeUrl)
    bitcoin.networkNodes.push(newNodeUrl);
  response.json({ note: 'New node registered successfully.' });
});

app.post('/register-nodes-bulk', (request, response) => {
  // ここでは、複数のnodeを一度に、networkへ追加していく.
  const { allNetworkNodes } = request.body;
  allNetworkNodes.forEach((networkNodeUrl) => {
    if (bitcoin.networkNodes.indexOf(networkNodeUrl) === -1 && bitcoin.currentNodeUrl !== networkNodeUrl)
      bitcoin.networkNodes.push(networkNodeUrl);
  });
  response.json({
    note: 'Bulk registration successful!',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
