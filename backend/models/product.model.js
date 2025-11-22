import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);
//db-> products
export default Product;
