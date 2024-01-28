const { Router } = require("express")
const User = require("../models/db")
const authMiddleware = require("../middlewares/authenticate")
const authRouter = Router()
const z = require("zod")
const bcrypt = require("bcryptjs")
const { default: mongoose } = require("mongoose")

authRouter.get('/users', authMiddleware, async (req, res) => {
    const filter = decodeURIComponent(req.query.filter)
    console.log(filter)
    try {
        const users = await User.find({
            $or: [
                {
                    firstName: {
                        "$regex": filter,
                        "$options": 'i'
                    }
                },
                {
                    lastName: {
                        "$regex": filter,
                        "$options": 'i'
                    }
                }
            ]
        });
        console.log(users)
        if (users) {
            res.status(200).json({
                user: users.map(user => ({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }))
            })
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({ msg: "Oops!!, some error happened" })
    }
})

const updateBody = z.object({
    username: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(6).optional()
})

authRouter.put('/update', authMiddleware, async (req, res) => {
    try {
        const isValid = updateBody.safeParse(req.body)
        if (!isValid.success) {
            res.status(400).json({ msg: "Oops, incorrect inputs" })
        }
        const user = await User.findOne({ username: isValid.data.username })
        const new_firstName = isValid.data.firstName
        const new_lastName = isValid.data.lastName
        const new_password = isValid.data.password
        if (new_firstName) {
            user.firstName = new_firstName
        } 
        if (new_lastName) {
            user.lastName = new_lastName
        }
        if (new_password) {
            const salt = bcrypt.genSaltSync(10);
            const hashedpassword = bcrypt.hashSync(isValid.data.password, salt)
            user.password = hashedpassword
        }
        await user.save()
        res.status(200).json({ msg: "User updated successfully" })
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "Oops!!, some error happened"})
    }
})

const PINbody =  z.object({
    username: z.string(),
    PIN: z.string().min(4).max(4)
})

// add a PIN for transactions
authRouter.post('/addpin', authMiddleware, async (req, res) => {
    try {
        const isValid = PINbody.safeParse(req.body)
        if (!isValid.success) {
            res.status(400).json({ msg: "Oops, incorrect inputs" })
        }
        const user = await User.findOne({ username: isValid.data.username })
        const PIN = isValid.data.PIN
        user.PIN = PIN
        await user.save()
        res.status(200).json({ msg: "PIN added successfully" })
    } catch(err) {
        console.error(err)
        res.status(500).json({ msg: "Oops!!, some error happened"})
    }
})
// Execute a transaction
authRouter.post('/transaction', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    const {to, from, amount} = req.body
    const money = parseInt(amount)
    const sender = await User.findOne({ username: from }).session(session)
    if (!sender || sender.balance < money) {
        await session.abortTransaction()
        session.endSession()
        res.status(400).json({ msg: "Insufficient balance" })
        return;
    }
    const receiver = await User.findOne({ username: to }).session(session)
    if (!receiver) {
        await session.abortTransaction()
        session.endSession()
        res.status(400).json({ msg: "The receiver doesn't exist" })
        return;
    }
    await User.updateOne({ username: from }, { $inc: { balance: -money } }).session(session)
    await User.updateOne({ username: to }, { $inc: { balance: money } }).session(session)
    await session.commitTransaction()
    session.endSession()
    res.status(200).json({ msg: "Transaction successful" })
})

module.exports = authRouter