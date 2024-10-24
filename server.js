require('dotenv').config()  
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const productRoute = require("./routes/productRoute")
const errorMiddleware = require("./middleware/errorMiddleware")

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/products", productRoute)


app.use(errorMiddleware);


mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(()=>{
    console.log("connected to mongoDb")

    app.listen(PORT, ()=> {
        console.log(`node api app is running on port ${3000}`)
    })
    
}).catch(()=>{
    console.log("erro ao conectar")
})