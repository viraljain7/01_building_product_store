import Product from "../models/product.model.js";
import { sendResponse } from "../utils/response.js";

// -------------------------------------------------------------------------------------
// ⭐ Validation helper
// -------------------------------------------------------------------------------------
const validateProduct = (product) => {
  if (!product.name || !product.price || !product.image) {
    return "All fields (name, price, image) are required";
  }
  if (isNaN(product.price)) {
    return "Price must be a number";
  }
  return null;
};

// -------------------------------------------------------------------------------------
// ⭐ Add Product
// -------------------------------------------------------------------------------------
export const addProduct = async (req, res) => {
  const product = req.body;

  // Validate user input
  const error = validateProduct(product);
  if (error) {
    return sendResponse(res, 400, false, error);
  }

  try {
    const newProduct = await Product.create(product);
    return sendResponse(res, 201, true, "New product added successfully", newProduct);
  } catch (err) {
    return sendResponse(res, 500, false, "Internal Server Error", err.message);
  }
};

// -------------------------------------------------------------------------------------
// ⭐ Get All Products
// -------------------------------------------------------------------------------------
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return sendResponse(res, 200, true, "All products fetched", allProducts);
  } catch (err) {
    return sendResponse(res, 500, false, "Server Error", err.message);
  }
};

// -------------------------------------------------------------------------------------
// ⭐ Get Single Product
// -------------------------------------------------------------------------------------
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    return sendResponse(res, 200, true, "Product fetched", product);
  } catch (err) {
    return sendResponse(res, 500, false, "Server Error", err.message);
  }
};

// -------------------------------------------------------------------------------------
// ⭐ Delete Product
// -------------------------------------------------------------------------------------
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const del = await Product.findByIdAndDelete(id);

    if (!del) {
      return sendResponse(res, 404, false, "Product not found");
    }

    return sendResponse(res, 200, true, "Product deleted successfully");
  } catch (err) {
    return sendResponse(res, 500, false, "Server Error", err.message);
  }
};

// -------------------------------------------------------------------------------------
// ⭐ Update Product
// -------------------------------------------------------------------------------------
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  // Validate input
  const error = validateProduct(productData);
  if (error) {
    return sendResponse(res, 400, false, error);
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return sendResponse(res, 404, false, "Product not found");
    }

    return sendResponse(res, 200, true, "Product updated successfully", updatedProduct);
  } catch (err) {
    return sendResponse(res, 500, false, "Server Error", err.message);
  }
};
