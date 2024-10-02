
import Product from "../models/product";
import { productValidattion } from "../schemas/product";

const getAllProducts =async (req, res) =>{
    try {
        const data = await Product.find().limit(2);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
};
const getAllProductsById =async (req, res) =>{
   try {
        const data = await Product.findById(req.params.id).exec();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
    //findone chuyền vào 1 object 
    // try {
    //     const data = await Product.findOne({_id:req.params.id});
    //     res.status(200).json(data);
    // } catch (error) {
    //     console.log(error)
    // }
};
 const createProducts = async (req, res) => {
    // console.log("Create a product");
    // console.log(request.body);
    // Product.create(request.body);
  
    try {
      const { error } = productValidattion.validate(req.body, {
        abortEarly: false,
      });
  
      if (error) {
        const errorMessages = error.details.map((message) => message.message);
        return res.status(400).json(errorMessages);
      }
      const data = await Product(req.body).save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  };
const updateProducts =async (req, res) =>{
    try {
        const data = await Product.findByIdAndUpdate(
            {_id : req.params.id},
            req.body,
            {new:true},
        )
        res.json(data);
    } catch (error) {
        console.log(error)
    }
    
};
const deleteProducts =async (req, res) =>{
    try {
        const data = await Product.findByIdAndDelete( {_id : req.params.id},  );
        res.status(200).json({data, message:"Delete Success"});
    } catch (error) {
        console.log(error)
    }
};

export{getAllProducts, getAllProductsById, createProducts, updateProducts, deleteProducts};