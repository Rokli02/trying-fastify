import { Document, model, Schema } from 'mongoose';

export enum Methods {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const ChangeLogSchema = new Schema({
  changeMethod: {
    type: String,
    required: true,
    enum: Methods,
  },
  reqParams: {
    type: String,
  },
  reqQuery: {
    type: String,
  },
  reqBody: {
    type: String,
  },
  created: { type: Date, default: new Date() },
});

export interface IChangeLog {
  changeMethod: string;
  reqParams?: string;
  reqQuery?: string;
  reqBody?: string;
  created?: Date;
}

export interface ChangeLogProps extends IChangeLog, Document {}

export default model<ChangeLogProps>('ChangeLog', ChangeLogSchema);
