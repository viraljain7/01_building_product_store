import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Root route working",
  });
});

// Product Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// Start server only after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });
