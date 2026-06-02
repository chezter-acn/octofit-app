import mongoose, { Schema } from "mongoose";
const teamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const Team = mongoose.model("Team", teamSchema);
