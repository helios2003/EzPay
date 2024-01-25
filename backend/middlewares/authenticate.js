const express = require('express')
const jwt = require("jsonwebtoken")
const app = express()
require('dotenv').config({ path: '../.env' })

const authMiddleware = app.use((req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        if (decodedToken) {
            next()
        } else {
            res.status(403).json({ msg: "Unauthorized access denied!!"})
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({ msg: "Oops!!, some error happened" })
    }  
})

module.exports = authMiddleware