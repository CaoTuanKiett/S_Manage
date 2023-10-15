const express = require('express');
const knex = require('../knexfile')
const app = express();
const port = 9696;
const stripe = require('./routers/stripe/stripe')
app.use('/payment', stripe);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
