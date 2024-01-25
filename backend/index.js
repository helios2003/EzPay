const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const userRouter = require("./routes/auth")
const authRouter = require("./routes/contacts")
const app = express()

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));

mongoose.connect("mongodb://localhost:27017/e-wallet")

app.use('/api/v1', userRouter)
app.use('/api/v2', authRouter)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})

