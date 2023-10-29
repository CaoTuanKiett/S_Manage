const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const path = require('path');


const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router')



const stripe = require('./routers/stripe/stripeRoute')
const author = require('./routers/authorization/roleRoute')
const statistic=require('./routers/statistics/statisticRoute')


app.use('/payment', stripe);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/author', author);
app.use('/statistic',statistic)


require('dotenv').config();

const port = process.env.PORT ;

// Cấu hình express.static để phục vụ tệp ảnh từ thư mục 'assets'
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

authRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
