const { Router } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/db")
const userRouter = Router()
const z = require("zod")
const bcrypt = require("bcryptjs")
require('dotenv').config({ path: '../.env' })

const signUpBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6)
})

// signup route
userRouter.post('/signup', async (req, res) => {
    try {
        const isValid = signUpBody.safeParse(req.body)
        if (!isValid.success) {
            res.status(400).json({ msg: "Oops, incorrect inputs" })
            return;
        }
        const existingUser = await User.findOne({ username: isValid.data.username })
        if (existingUser) {
            res.status(409).json({msg: "User with the same credentials exists"})
            return;
        } 
        const salt = bcrypt.genSaltSync(10);
        const hashedpassword = bcrypt.hashSync(isValid.data.password, salt)
        const newUser = new User({
            username: isValid.data.username,
            firstName: isValid.data.firstName,
            lastName: isValid.data.lastName,
            password: hashedpassword,
            balance: parseInt(1 + Math.random() * 10000),
            salt: salt
        })
        const user = await newUser.save()
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.status(201).json({ 
            msg: "New user created", 
            token: token, username: user.username, 
            firstName: user.firstName, 
            lastName: user.lastName
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "Oops!!, some error happened"})
    }
})

// signin route
userRouter.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(411).json({ msg: "The user doesnt exist" })
        } 
        const checkpwd = bcrypt.compareSync(password, user.password)
        if (!checkpwd) {
            return res.status(411).json({ msg: "The password is incorrect" })
        } 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        return res.status(200).json({ 
            msg: "Welcome back!!", 
            token: token,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "Oops!!, some error happened"})
    }
})


module.exports = userRouter

