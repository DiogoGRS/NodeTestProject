const mongoose = require("mongoose")
const express = require("express")
const app = express()
const Product = require("./models/productModel")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res)=>{
    res.send("Hello from getty")
})

app.get("/blog", (req, res)=>{
    res.send("Hello from get and nodemon")
})

app.get("/products", async(req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})    
    }
})

app.get("/products/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put("/products/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with this id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.post("/products", async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete("/products/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: "cannot find any product with this id"})
        }
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://diogogrsantos1:virgulino12@cluster0.c3f20.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to mongoDb")

    app.listen(3000, ()=> {
        console.log("node api app is running on port 3000")
    })

    
}).catch(()=>{
    console.log("erro ao conectar")
})