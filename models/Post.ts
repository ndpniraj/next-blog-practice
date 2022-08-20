import Mongoose, { Schema } from "mongoose";
import { PostModel } from "../utils/types";

const postSchema: Mongoose.Schema<PostModel> = new Mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    meta: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Niraj Dhungana",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    tags: [String],
    topic: String,
  },
  {
    timestamps: true,
  }
);

export default Mongoose.models?.Post ||
  Mongoose.model<PostModel>("Post", postSchema);
