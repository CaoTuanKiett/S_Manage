const bodyParser = require('body-parser')
const express = require('express');

const path = require('path');

const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');

const stripe = require('./routers/stripe/stripeRoute');
const author = require('./routers/authorization/roleRoute');
const statistic = require('./routers/statistics/statisticRoute');


const port = process.env.PORT;

const app = express();
const cors = require('cors');
require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(`${process.env.API_V1}/payment`, stripe);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${process.env.API_V1}/author`, author);
app.use(`${process.env.API_V1}/statistic`, statistic);




// Cấu hình express.static để phục vụ tệp ảnh từ thư mục 'assets'
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

authRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
