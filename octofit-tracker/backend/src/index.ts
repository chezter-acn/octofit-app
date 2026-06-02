import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = 8000;
const mongoUri = "mongodb://localhost:27017/octofit";

// Middleware
app.use(express.json());

// Codespaces-aware API URL support
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "OctoFit Tracker backend is running.",
    apiUrl: getApiUrl(),
    version: "0.1.0",
  });
});

// Users endpoint
app.get("/api/users/", (req: Request, res: Response) => {
  res.json({
    message: "Users endpoint",
    users: [],
  });
});

app.post("/api/users/", (req: Request, res: Response) => {
  res.json({
    message: "Create user",
    user: req.body,
  });
});

// Teams endpoint
app.get("/api/teams/", (req: Request, res: Response) => {
  res.json({
    message: "Teams endpoint",
    teams: [],
  });
});

app.post("/api/teams/", (req: Request, res: Response) => {
  res.json({
    message: "Create team",
    team: req.body,
  });
});

// Activities endpoint
app.get("/api/activities/", (req: Request, res: Response) => {
  res.json({
    message: "Activities endpoint",
    activities: [],
  });
});

app.post("/api/activities/", (req: Request, res: Response) => {
  res.json({
    message: "Log activity",
    activity: req.body,
  });
});

// Leaderboard endpoint
app.get("/api/leaderboard/", (req: Request, res: Response) => {
  res.json({
    message: "Leaderboard endpoint",
    leaderboard: [],
  });
});

// Workouts endpoint
app.get("/api/workouts/", (req: Request, res: Response) => {
  res.json({
    message: "Workouts endpoint",
    workouts: [],
  });
});

app.post("/api/workouts/", (req: Request, res: Response) => {
  res.json({
    message: "Create workout suggestion",
    workout: req.body,
  });
});

// MongoDB connection
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB at", mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on ${getApiUrl()}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
