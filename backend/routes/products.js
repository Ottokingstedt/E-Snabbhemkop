const express = require("express")
const cloudinary = require("cloudinary");
const { Product } = require("../models/productModel");
const router = express.Router();
const {isAdmin} = require('../middleware/auth');
// Create Products

cloudinary.config({ 
    cloud_name: 'esnabbhemkop', 
    api_key: '657754726715211', 
    api_secret: 'YqZ7eagUulvpbN3udOtkYS5peCs',
    secure: true
  });

  // Create Product

router.post("/", isAdmin, async(req, res) => {
    const {name, category, description, price, image } = req.body;

    try{
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "online-ecommerce",
            })
            if(uploadedResponse){
                const product = new Product({
                    name, 
                    category,
                    description,
                    price,
                    image: uploadedResponse,
                })

                const savedProduct = await product.save()

                res.status(200).send(savedProduct);
            }
        }
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/", async(req, res) =>{
    try{
    const products = await Product.find()
    res.status(200).send(products)
} catch(error){
    console.log(error);
    res.status(500).send(error);
}
});

// GET Product

router.get("/find/:id", async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    }catch(error){
        res.status(500).send(error);
    }
})

// Delete

router.delete("/:id", isAdmin, async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product) return res.status(404).send("Product not found...");

        if(product.image.public_id){
            const destroyResponse = await cloudinary.uploader.destroy(
                product.image.public_id
            );
        if(destroyResponse){
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);

            res.status(200).send(deletedProduct);
                }
        } else {
            console.log("Action terminated. Failed to deleted product image...")
        }
    } catch (error){
        res.status(500).send(error)
    }
})

// Update Product 

router.put("/:id", isAdmin, async (req, res) => {
    if(req.body.productImg) {
        try {
        const destroyResponse = await cloudinary.uploader.destroy(
            req.body.product.image.public_id
        );

    if(destroyResponse){
        const uploadedResponse = await cloudinary.uploader.upload(
            req.body.productImg,
            {
                upload_preset: "online-shop",
            }
        );

        if(uploadedResponse){
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                   $set:  {
                    ...req.body.product,
                    image: uploadedResponse,
                   },
                },
                { new: true }
            );

            res.status(200).send(updatedProduct)
            }
        }
    } catch (error){
        res.status(500).send(error);
       } 
    } else {
       try{ 
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body.product,
            },
            {new: true}
        ); 
        res.status(200).send(updatedProduct);
       } catch (error){
        res.status(500).send(error);
       } 
    } 
});

router.get("/search", async (req, res) => {
    try {
      const { query } = req.query;
      const products = await Product.find({
        name: { $regex: query, $options: "i" }
      });
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  



module.exports = router