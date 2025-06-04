const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const { User, Account } = require('../db'); 
const { Authservice } = require('../middleware/checkAuth');
router.get('/balance',Authservice,(req, res) => {
    const userId = req.user.id; 

    Account.findOne({ userId })
        .then(account => {
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            res.json({ balance: account.balance });
        })
        .catch(err => {
            console.error('Error fetching account balance:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
})
router.post('/transfer', Authservice, async (req, res) => {
  try {
    const { amount, to } = req.body;
    const userId = req.user.id;
    const amount1= Number(amount);

    const account = await Account.findOne({ userId });
    if (!account || account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance or account not found' });
    }

    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
      return res.status(400).json({ error: 'Recipient account not found' });
    }
    if(toAccount.userId.toString() === userId)return res.json({ error: 'You cannot transfer money to your own account' });
    if (!amount || typeof amount1 !== 'number') {
      return res.status(400).json({ error: 'Invalid transfer amount' });
    }
    account.balance -= amount1;
    await account.save();

    toAccount.balance += amount1;
    await toAccount.save();

    res.json({
      message: 'Transfer successful',
      from: {
        userId,
        newBalance: account.balance,
      },
      to: {
        userId: to,
        newBalance: toAccount.balance,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Transfer failed' });
  }
});


module.exports=router;