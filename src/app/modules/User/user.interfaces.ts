import { Document } from "mongoose";

export interface IUser {
   name: string;
}

export interface IUserDoc extends Document, IUser {}
