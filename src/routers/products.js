import express from "express";
import { createProducts, deleteProducts, getAllProducts, getAllProductsById, updateProducts } from "../controllers/products";
import { chenkAuth } from "../middlewares/checkAuth";

 const router = express.Router();

router.get("/products",getAllProducts );
router.get("/products/:id",getAllProductsById );
router.post("/products",chenkAuth, createProducts);
router.put("/products/:id",chenkAuth, updateProducts );
router.delete("/products/:id",chenkAuth,  deleteProducts);

export default router