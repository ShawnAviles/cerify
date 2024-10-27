import express from "express";
import "dotenv/config";
import { connectDB } from "./config/mongoConnection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

await connectDB();

app.use(express.json());

app.use("/user", userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
