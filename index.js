
const express = require("express");
const app=express();
require('dotenv').config();

app.use(express.json());
const bodyParser = require("body-parser");
const port=process.env.PORT || 3000;
const cors = require("cors");app.use(cors({
  origin: 'http://localhost:5173', // your frontend's origin
  credentials: true,              // this allows cookies to be set
}));
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
const indexRouter = require("./Routes/index");
app.use(cookieParser());

app.use('/', indexRouter);
app.listen((port), () => {
    console.log(`Server is running on port ${port}`);
});

