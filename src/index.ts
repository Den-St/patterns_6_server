import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data source:", err);
  });
