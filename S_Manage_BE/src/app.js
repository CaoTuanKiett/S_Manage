
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const cron = require('./services/cronJobMail');
const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const mailRouter = require('./routers/mail.router');
const stripe = require('./routers/stripe/stripeRoute')
const author = require('./routers/authorization/roleRoute')
const statistic = require('./routers/statistics/statisticRoute')
const path = require('path');

const port = process.env.PORT;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());
// đừng nhét cái ni xuống dưới pleaseeeeeee !!!!!!!
app.use(`${process.env.API_V1}/payment`, stripe);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Cấu hình express.static để phục vụ tệp ảnh từ thư mục 'assets'
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

authRouter(app);
userRouter(app);
mailRouter(app);

// app.use('/payment', stripe);
// app.use('/author', author);
// app.use('/statistic',statistic)


app.use(`${process.env.API_V1}/author`, author);
app.use(`${process.env.API_V1}/statistic`, statistic);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})