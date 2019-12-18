const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const userRouter = require("./router/user")
const favoriteRouter = require("./router/favorite")
const cors = require('cors')
const app = express()
app.use(cors());
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

mongoose.connect("mongodb://mongo:27017/test", {useNewUrlParser: true})

app.use("/users", userRouter)
app.use("/favorites", favoriteRouter)

app.listen(3000, () => {
    console.log("Listening to part 3000")
})