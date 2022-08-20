import axios from "axios";
import {
  INewPostComment,
  INewPostCommentResponse,
  postCommentResponse,
} from "./types";

export const sendNewPostCommentRequest = async (
  comment: INewPostComment
): Promise<INewPostCommentResponse> => {
  const { data } = await axios.post("/api/comment", comment);
  return data;
};

export const sendCommentReply = async (
  comment: INewPostComment
): Promise<INewPostCommentResponse> => {
  const { data } = await axios.post("/api/comment/add-reply", comment);
  return data;
};

export const getComments = async (
  postId: string
): Promise<postCommentResponse> => {
  const { data } = await axios("/api/comment?postId=" + postId);
  return data;
};

export const updateCommentLike = async (
  commentId: string
): Promise<INewPostCommentResponse> => {
  const { data } = await axios.post(
    "/api/comment/update-like?commentId=" + commentId
  );
  return data;
};

export const updateComment = async (
  commentId: string,
  content: string
): Promise<INewPostCommentResponse> => {
  const { data } = await axios.patch("/api/comment?commentId=" + commentId, {
    content,
  });
  return data;
};

export const deleteComment = async (
  commentId: string
): Promise<{ removed: boolean }> => {
  const { data } = await axios.delete("/api/comment?commentId=" + commentId);
  return data;
};

export const getAllComments = async (pageNo: number, limit: number) => {
  const { data } = await axios(
    `/api/admin/comment?pageNo=${pageNo}&limit=${limit}`
  );
  return data;
};
