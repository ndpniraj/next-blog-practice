import axios from "axios";

export const updatePostLike = async (
  postId: string
): Promise<{ newLikes: number }> => {
  const { data } = await axios.post("/api/post/update-like?postId=" + postId);
  return data;
};

export const isPostLikedByUser = async (
  postId: string
): Promise<{ likesCount: number; likedByOwner: boolean }> => {
  const { data } = await axios(`/api/post/like-status?postId=${postId}`);
  return data;
};
