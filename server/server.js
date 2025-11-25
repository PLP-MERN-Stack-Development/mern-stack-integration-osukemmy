import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import categoryRoutes from "./routes/categories.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
