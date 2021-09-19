const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
// console.dir(bitcoin, { depth: null });
// --------    block作って、transactionを行う。 -------------

// bitcoin.createNewBlock(3467, 'F1P9HG498HI', 'DJJO248TQOFHQ');
// bitcoin.createNewTransaction(100, 'JIM_F9N834HHF1O', 'JOHN_DJOHF0HF90U9');
// bitcoin.createNewBlock(34, 'UDHQFG98RQJ', 'CNWOEHFI20I1V'); //ここで新たにminingする。。。
// bitcoin.createNewTransaction(3000, 'MUSK_U81G9GF1', 'BILL_8R1GFN3OF');
// bitcoin.createNewTransaction(9, 'JOBS_JF89H11', 'LARRY_JI2HIHI92F');
// bitcoin.createNewTransaction(772, 'WARREN_JID2O1F3', 'JEFF_U82B1FF1');
// bitcoin.createNewTransaction(45, 'MARK_YUIFBI0U93', 'JACK_I90HIFOFF');
// bitcoin.createNewBlock(7832, 'HF89F2G02G', 'UF8HF22UO'); // miningすることで、取引が完了する仕組みなんだ。逆に、mineされなければ、その取引は完了しない。

// console.dir(bitcoin, { depth: null });

// ---------- hashing algorithms , proof of work------------------
// const previousBlockHash = 'H8F91OBLIR9E3';
// const currentBlockData = [
//   {
//     amount: 23,
//     sender: 'BOB_J89DOBF',
//     recipient: 'SAM_J893OIBF',
//   },
//   {
//     amount: 1832,
//     sender: 'ALICE_NCOQRHVV',
//     recipient: 'JEFFRY_H89V3BVO',
//   },
//   {
//     amount: 107,
//     sender: 'CHIRIS_FN81N9OH',
//     recipient: 'DOE_FJ30131O',
//   },
// ];

// //　前のblock hashと、今重なっているtransactionのデータを使って、0000から始まるまあ、hash dateをとにかく作って、最終的にそのnonce（number only used once）が返ってくる。

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));
// // →1秒くらいかかって232385っていうnonceが返ってきた。
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 232385));
// 結果のnonceを使って、hashを生み出す。（これが、次でいうところのpreviousHashBlockになるのかな？）
