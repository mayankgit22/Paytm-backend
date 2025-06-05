const express=require('express');
const router=express.Router();
const bulkFind=require('./finding')
const signUpRoute = require('./signUpRoute');
const signInRoute = require('./signinRoute');
const updateRoute = require('./updateRoute');
const accountRouter=require('./accountRoute');
const allusers= require('./allUsers');
// const transferFund = require('./transferFund');
router.use('/user/signup', signUpRoute);
router.use('/user/signin', signInRoute);
router.use('/user/update', updateRoute);
router.use('/user/bulk',bulkFind);
router.use('/users', allusers);
router.use('/user/account', accountRouter);
module.exports=router;
