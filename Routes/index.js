const express=require('express');
const router=express.Router();
const bulkFind=require('./finding')
const signUpRoute = require('./signUpRoute');
const signInRoute = require('./signinRoute');
const updateRoute = require('./updateRoute');
const accountRouter=require('./accountRoute');
const allusers= require('./allUsers');
// const transferFund = require('./transferFund');
router.use('/api/v1/user/signup', signUpRoute);
router.use('/api/v1/user/signin', signInRoute);
router.use('/api/v1/user/update', updateRoute);
router.use('/api/v1/user/bulk',bulkFind);
router.use('/api/v1/users', allusers);
router.use('/api/v1/user/account', accountRouter);
module.exports=router;