import mongoose, { Schema } from "mongoose";
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, default: 0 },
    activitiesCompleted: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
