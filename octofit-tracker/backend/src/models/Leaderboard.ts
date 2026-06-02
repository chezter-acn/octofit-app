import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  rank: number;
  totalPoints: number;
  activitiesCompleted: number;
  totalCalories: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, default: 0 },
    activitiesCompleted: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>(
  "Leaderboard",
  leaderboardSchema
);
