import express, { Request, Response } from "express";
import { connectDatabase } from "./config/database.js";
import { User } from "./models/User.js";
import { Team } from "./models/Team.js";
import { Activity } from "./models/Activity.js";
import { Leaderboard } from "./models/Leaderboard.js";
import { Workout } from "./models/Workout.js";

const app = express();
const port = 8000;

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

app.get("/api/users/", async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      message: "Users endpoint",
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/users/", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "Create user",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

app.get("/api/teams/", async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate("members", "-password")
      .populate("createdBy", "-password");
    res.json({
      message: "Teams endpoint",
      teams,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.post("/api/teams/", async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json({
      message: "Create team",
      team,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to create team" });
  }
});

app.get("/api/activities/", async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate("userId", "-password");
    res.json({
      message: "Activities endpoint",
      activities,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

app.post("/api/activities/", async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({
      message: "Log activity",
      activity,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to log activity" });
  }
});

app.get("/api/leaderboard/", async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate("userId", "-password")
      .populate("teamId")
      .sort({ rank: 1 });
    res.json({
      message: "Leaderboard endpoint",
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.get("/api/workouts/", async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate("userId", "-password");
    res.json({
      message: "Workouts endpoint",
      workouts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});

app.post("/api/workouts/", async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({
      message: "Create workout suggestion",
      workout,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to create workout" });
  }
});

connectDatabase()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Backend listening on ${getApiUrl()}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
