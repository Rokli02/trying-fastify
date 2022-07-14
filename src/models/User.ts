import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  nicknames: { type: [String] },
  address: {
    city: { type: String, required: true },
    road: { type: String },
    house_num: { type: String },
  },
  created: { type: Date, default: new Date() },
});

export interface IUser {
  name: string;
  nicknames?: string[];
  address: Address;
  created?: Date;
}

type Address = {
  city: string;
  road?: string;
  house_num?: string;
};

export interface UserProps extends IUser, Document {}

export default model<UserProps>('User', UserSchema);
