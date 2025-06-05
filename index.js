const express = require("express");
const app = express();
require('dotenv').config();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const indexRouter = require("./Routes/index");

const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://paytm-frontend-beryl.vercel.app',
  'https://vercel.com',
  'http://localhost:3000',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
