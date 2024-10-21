const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.send("Hello from get")
})

app.listen(3000, ()=> {
    console.log("node api app is running on port 3000")
})