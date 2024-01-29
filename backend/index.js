const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const userRouter = require("./routes/auth")
const authRouter = require("./routes/contacts")
const app = express()
dotenv.config({ path: '../.env' })

const options = {
  socketTimeoutMS: 3000000,
};

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));

mongoose.connect(process.env.MONGO_URI, options)

app.use('/api/v1', userRouter)
app.use('/api/v2', authRouter)

const PORT = 3000

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ msg: "Oops!!, an unexpected error occured" })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})

