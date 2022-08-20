import { compare, hash } from "bcrypt";
import Mongoose, { Schema, model, Model, Types } from "mongoose";

export interface IComment {
  belongsTo: Types.ObjectId;
  owner: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  replies?: Types.ObjectId[];
  repliedTo?: Types.ObjectId;
  chiefComment?: boolean;
  createdAt?: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

const CommentSchema = new Schema<IComment, {}, IUserMethods>(
  {
    // parent post id
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // parent comment id
    repliedTo: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    chiefComment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

type comment = Model<IComment>;
export default (Mongoose.models?.Comment ||
  Mongoose.model<IComment>("Comment", CommentSchema)) as comment;
