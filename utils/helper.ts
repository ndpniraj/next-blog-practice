import { useRouter } from "next/router";
import { formattedPost, IUserProfile, PostModel } from "./types";

export const formatPosts = (posts: PostModel[]): formattedPost[] => {
  return posts.map((p) => {
    return {
      id: p._id?.toString() || "",
      author: p.author,
      title: p.title,
      meta: p.meta || "",
      date: p.createdAt?.toString() || "",
      thumbnail: p.thumbnail?.url || "",
      slug: p.slug,
      likes: p.likes?.length || 0,
    };
  });
};

export const dateFormat = (date: string): string => {
  const newDate = new Date(date);
  let month: string | number = newDate.getMonth();

  switch (month) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "";
  }

  const year = newDate.getFullYear();
  const day = newDate.getDate();

  return month + " " + day + " " + year;
};

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export const runAsync = async <T, E>(
  fun: Promise<T>,
  errorHandler: (error: any) => E
): Promise<T | E> => {
  return await fun.catch(errorHandler);
};

export const catchError = (error: any): { error: string } => {
  const response = error.response?.data;
  if (response) return response;

  return { error: error.message || "Some thing went wrong!" };
};

export const getSignInPath = (asPath: string) => {
  return asPath.split("?auth=")[0] + "?auth=signin";
};

export const getSignUpPath = (asPath: string) => {
  return asPath.split("?auth=")[0] + "?auth=signup";
};

export const getForgetPasswordPath = (asPath: string) => {
  return asPath.split("?auth=")[0] + "?auth=forget-password";
};

export const getNonAuthPath = (asPath: string) => {
  return asPath.split("?auth=")[0];
};

export const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export const getLikedBy = (likes: any, user: IUserProfile) =>
  !user ? false : likes.includes(user.id);
