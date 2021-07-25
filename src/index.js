const express = require("express");
require("./db")
const Product = require("./models")

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    return res.send("Welcome to CRUD App");
})

app.post('/api/products', async (req,res) => {
    try{
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
        })
        await product.save();
        return res.status(200).send(product);
    } catch(e) {
        return res.status(500).send(e);
    }
})

app.get('/api/products', async (req,res) => {
    const products = await Product.find();
    try{
    return res.status(200).send(products);
    } catch(e){
        return res.status(500).send(e);
    }
})

app.get('/api/products/:id', async (req,res) => {
    const _id = req.params.id;
    try{
        const products = await Product.findById(_id);
        return res.status(200).send(products);
    } catch(e) {
        return res.status(500).send(e);
    }
})

app.patch('/api/products/:id', async (req,res) => {
    const _id = req.params.id;
    try{
        const products = await Product.findByIdAndUpdate(_id, req.body);
        if(products){
            const productUp = await Product.findById(_id);
            return res.status(200).send(productUp);
        }else {
            return res.status(400).send("Update Failed");
        }
    } catch(e) {
        return res.status(500).send(e);
    }
})

app.delete('/api/products/:id', async (req,res) => {
    const _id = req.params.id;
    try{
        const product = await Product.findByIdAndDelete(_id);
        if(product) {
            return res.status(200).send("Successfully Deleted");
        } else {
            return res.status(400).send("Deletion Failed");
        }
    } catch(e) {
        return res.status(500).send(e);
    }
})

app.listen(3000, () => {console.log("Listening on port 3000")})