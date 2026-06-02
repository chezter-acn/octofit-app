import mongoose, { Schema } from "mongoose";
const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String },
    exercises: [String],
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const Workout = mongoose.model("Workout", workoutSchema);
