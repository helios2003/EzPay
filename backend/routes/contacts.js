const { Router } = require("express")
const User = require("../models/db")
const authMiddleware = require("../middlewares/authenticate")
const authRouter = Router()
const z = require("zod")
const bcrypt = require("bcryptjs")

authRouter.get('/contacts', authMiddleware, async (req, res) => {
    const filter = req.query.filter
    try {
        const contacts = await User.find({
            $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]})
        if (contacts) {
            res.json({
                contact: contacts.map(contact => ({
                    username: contact.username,
                    firstName: contact.firstName,
                    lastName: contact.lastName
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

// add a PIN for transactions
authRouter.post('/addpin', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ username: username })
        const PIN = req.body.PIN
        user.PIN = PIN
        await user.save()
        res.status(200).json({ msg: "PIN added successfully" })
    } catch(err) {
        res.status(500).json({ msg: "Oops!!, some error happened"})
    }
})

module.exports = authRouter