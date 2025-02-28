import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, type: "application/json" }));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(Number(port), host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
