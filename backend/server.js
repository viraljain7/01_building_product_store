import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());


const __dirname=path.resolve();

// Test route
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     success: true,
//     message: "Root route working",
//   });
// });

// Product Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "Production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");


  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


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
