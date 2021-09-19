const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
bitcoin.createNewBlock(3467, 'F1P9HG498HI', 'DJJO248TQOFHQ');
bitcoin.createNewTransaction(100, 'JIM_F9N834HHF1O', 'JOHN_DJOHF0HF90U9');
bitcoin.createNewBlock(34, 'UDHQFG98RQJ', 'CNWOEHFI20I1V'); //ここで新たにminingする。。。
bitcoin.createNewTransaction(3000, 'MUSK_U81G9GF1', 'BILL_8R1GFN3OF');
bitcoin.createNewTransaction(9, 'JOBS_JF89H11', 'LARRY_JI2HIHI92F');
bitcoin.createNewTransaction(772, 'WARREN_JID2O1F3', 'JEFF_U82B1FF1');
bitcoin.createNewTransaction(45, 'MARK_YUIFBI0U93', 'JACK_I90HIFOFF');
bitcoin.createNewBlock(7832, 'HF89F2G02G', 'UF8HF22UO'); // miningすることで、取引が完了する仕組みなんだ。逆に、mineされなければ、その取引は完了しない。

console.dir(bitcoin, { depth: null });
