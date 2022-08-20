import { ObjectId, Model } from "mongoose";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ChangeEventHandler } from "react";

export type editor = HTMLTextAreaElement;

export type styleTypes =
  | "link"
  | "bold"
  | "italic"
  | "code-block"
  | "code"
  | "blockquote"
  | "ol"
  | "ul"
  | "h1"
  | "h2"
  | "h3"
  | "youtube";

export type topics =
  | "React Native"
  | "React"
  | "Kotlin"
  | "JavaScript"
  | "Node JS"
  | "Next JS";

export interface PostModel {
  _id?: ObjectId;
  createdAt?: Date;
  slug: string;
  title: string;
  meta: string;
  author: string;
  content: string;
  thumbnail: { url: string; public_id: string };
  tags: string[];
  topic?: topics;
}

export type formattedPost = {
  id: string;
  author: string;
  title: string;
  meta: string;
  date: string;
  thumbnail: string;
  slug: string;
  tags?: string[];
  source?: MDXRemoteSerializeResult;
};

export type postSchema = {
  id: string;
  meta: string;
  slug: string;
  title: string;
  content: string;
  thumbnail: string;
  thumbnailFile?: File;
  source?: MDXRemoteSerializeResult;
  date: string;
  author: string;
  topic: topics | string;
  tags: string;
};

export type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
export type TextAreaChangeHandler = ChangeEventHandler<HTMLTextAreaElement>;

export type Error = {
  path: string;
  message: string;
};

export type authFormType = "signin" | "signup" | "forget-password";

export interface INewUserInfo {
  name: string;
  email: string;
  password: string;
}

export interface INewPostComment {
  content: string;
  belongsTo?: string;
  repliedTo?: string;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface INewPostCommentResponse {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  belongsTo: string;
  likedByOwner?: boolean;
  replies?: postCommentResponse;
  repliedTo?: string;
  chiefComment: boolean;
  owner: { name: string; id: string };
}

export interface IPostComment {
  id: string;
  content: string;
  createdAt?: string;
  likes: number;
  owner: {
    id: string;
    name: string;
  };
}

export type postCommentResponse = INewPostCommentResponse[];
