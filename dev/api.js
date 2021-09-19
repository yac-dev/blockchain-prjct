const express = require('express');
const app = express();

app.use(express.json());

app.get('/blockchain', (request, response) => {
  response.send('hello');
});

app.post('/transaction', (request, response) => {});

app.get('/mine', (request, response) => {});

app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
