import express from "express";
import "dotenv/config";
import { connectDB } from "./config/mongoConnection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

await connectDB();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/user", userRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
