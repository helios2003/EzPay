const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    balance: Number,
    PIN: String,
    salt: String
})

module.exports = mongoose.model('User', UserSchema)