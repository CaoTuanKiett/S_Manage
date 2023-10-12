const express = require('express');
const app = express();


require('dotenv').config();

const port = process.env.PORT ;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
