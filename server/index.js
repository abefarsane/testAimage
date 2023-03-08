const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
    cors({
        credentials: true,
        methods: ["GET","POST","PUT", "DELETE"],
        origin: "http://localhost:3000"
    })
);



const userRouter = require('./routes/Users')
app.use("/auth", userRouter)


db.sequelize.sync()
    .then((req) => {
        app.listen(3001, () => {
            console.log("Server is running on port 3001")
        })
    })
  .catch((err) => {
    console.log(err)
})