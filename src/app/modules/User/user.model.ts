import { Schema, model } from "mongoose";
import type { IUserDoc } from "./user.interfaces";

const userSchema = new Schema<IUserDoc>(
   {
      name: {
         type: String,
      },
   },
   {
      timestamps: true,
      versionKey: false,
   },
);

export const User = model<IUserDoc>("User", userSchema);
