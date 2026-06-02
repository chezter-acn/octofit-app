import mongoose, { Schema, Document } from "mongoose";

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: string;
  difficulty: string;
  duration: number;
  description: string;
  exercises: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String },
    exercises: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>("Workout", workoutSchema);
