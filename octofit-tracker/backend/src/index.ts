import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 8000;
const mongoUri = "mongodb://localhost:27017/octofit";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OctoFit Tracker backend is running.");
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB at", mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
