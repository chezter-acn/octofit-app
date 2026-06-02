import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
