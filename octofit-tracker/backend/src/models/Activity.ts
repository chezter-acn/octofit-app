import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
  description: string;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);
