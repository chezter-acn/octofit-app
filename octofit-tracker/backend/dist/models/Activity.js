import mongoose, { Schema } from "mongoose";
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
}, { timestamps: true });
export const Activity = mongoose.model("Activity", activitySchema);
