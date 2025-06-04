require('dotenv').config();
const mongoose = require('mongoose');

const url=process.env.MONGODB_URL ;
console.log('Connecting to MongoDB at:', url);
mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const UserSchema=new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });
    const accountSchema=new mongoose.Schema({
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // name of the related model (optional, only if referencing another collection)
  },
        balance: { type: Number, default:()=> Math.floor(Math.random() * (6000 - 500 + 1)) + 500 },
    });
    const User = mongoose.model('User', UserSchema);
    const Account = mongoose.model('Account', accountSchema);
    module.exports = { User, Account };