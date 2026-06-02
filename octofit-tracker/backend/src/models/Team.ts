import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>("Team", teamSchema);
