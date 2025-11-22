import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Add
router.post("/", addProduct);

// Get all
router.get("/", getAllProducts);

// Get one by ID
router.get("/:id", getSingleProduct);

// Update
router.put("/:id", updateProduct);

// Delete
router.delete("/:id", deleteProduct);

export default router;
