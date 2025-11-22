import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 1. Connection Options
    // modern Mongoose (v6+) manages most options automatically,
    // but you can still explicitly set these for clarity or specific tuning.
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`,
      {
        // Prevent generic timeout errors by waiting 45 seconds max
        serverSelectionTimeoutMS: 45000,
        // Close sockets after 45 seconds of inactivity
        socketTimeoutMS: 45000,
      },
    );

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    // 2. Critical Failure Exit
    // If we can't connect to the DB, the server is useless.
    // Exit with failure code (1) so Docker/PM2 can restart it.
    process.exit(1);
  }
};

// 3. Runtime Event Listeners
// These handle errors that happen AFTER the initial connection
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

export default connectDB;
