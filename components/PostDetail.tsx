import { FC, useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

import {
  formattedPost,
  INewPostCommentResponse,
  postCommentResponse,
} from "../utils/types";
import Elements from "../components/Elements";
import Image from "next/image";
import Adsense from "../components/Adsense";
import {
  catchError,
  dateFormat,
  getSignInPath,
  runAsync,
} from "../utils/helper";
import CopyBtnDemo from "../components/demo/CopyBtnDemo";
import Share from "./Share";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import {
  deleteComment,
  getComments,
  sendCommentReply,
  sendNewPostCommentRequest,
  updateComment,
  updateCommentLike,
} from "../utils/comment";
import CommentCard, { editedComment } from "./CommentCard";
import { useRouter } from "next/router";
import LikeHeart from "./LikeHeart";
import { isPostLikedByUser, updatePostLike } from "../utils/post";

const PostCommentForm = dynamic(() => import("./PostCommentForm"), {
  ssr: false,
});

const {
  Heading,
  CustomImage,
  Paragraph,
  List,
  Code,
  Quote,
  Link: CustomLink,
  YouTube,
} = Elements;

const components = {
  Adsense,
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3,
  p: Paragraph,
  li: List.UL,
  pre: Code.Block,
  code: Code.Inline,
  blockquote: Quote,
  a: CustomLink,
  CopyBtnDemo,
  YouTube,
  // img: CustomImage,
};

interface Props {
  post: formattedPost;
}

const BlogMeta: FC<{ date: string; author: string }> = ({ date, author }) => {
  if (!date || !author) return null;

  return (
    <div className="space-y-1">
      <p className="font-semibold dark:text-high-contrast-dark text-high-contrast text-lg font-ibm_plex-400 tracking-wider">
        By: {author}
      </p>
      <p className="dark:text-low-contrast-dark text-low-contrast font-ibm_plex-400">
        {dateFormat(date)}
      </p>
    </div>
  );
};

const Tags: FC<{ tags?: string[] }> = ({ tags }) => {
  return (
    <div className="space-x-2 dark:text-low-contrast-dark text-low-contrast">
      {tags?.map((t, index) => (
        <span key={t + index}>#{t}</span>
      ))}
    </div>
  );
};

// const getHeartIcon = () => {
//   if (comment.likedByOwner) return <BsHeartFill color="#4790FD" size={16} />;
//   return <BsHeart size={16} />;
// };

const PostDetail: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<postCommentResponse>([]);
  const [resetCommentForm, setResetCommentForm] = useState(false);
  const [isPostLikedByProfileOwner, setIsPostLikedByProfileOwner] =
    useState(false);
  const [likes, setLikes] = useState(0);
  const router = useRouter();
  const { asPath } = router;

  const { status, data } = useSession();
  const authenticated = status === "authenticated";
  const user = data?.user;

  const handleCommentSubmit = async (content: string) => {
    let { error, comment } = (await runAsync(
      sendNewPostCommentRequest({ content, belongsTo: post.id }),
      catchError
    )) as {
      comment?: INewPostCommentResponse;
      error?: string;
    };

    if (error) return console.log(error);

    if (comment) setComments([...comments, { ...comment }]);
    setResetCommentForm(true);
  };

  const handleOnReplyCommentSubmit = async (comment: {
    content: string;
    repliedTo: string;
  }) => {
    const res = (await runAsync(
      sendCommentReply({ ...comment }),
      catchError
    )) as any;
    if (res.error) return console.log(res.error);

    const newComments = comments.map((c) => {
      if (c.id === res.comment.repliedTo) c.replies?.push(res.comment);
      return c;
    });

    setComments([...newComments]);
  };

  const handleOnPostLike = async () => {
    if (!user) return router.push(getSignInPath(asPath));
    const res = (await runAsync(updatePostLike(post.id), catchError)) as {
      error: string;
      newLikes: number;
    };

    if (res.error) return console.log(res);

    setIsPostLikedByProfileOwner(!isPostLikedByProfileOwner);
    setLikes(res.newLikes);
  };

  const handleOnCommentLike = async (comment: INewPostCommentResponse) => {
    const res = (await runAsync(updateCommentLike(comment.id), catchError)) as {
      error: string;
      comment: INewPostCommentResponse;
    };

    if (res.error) return console.log(res);

    // After success
    // if comment is the chiefComment change it with the incoming comment response
    // if not then filter the replies

    let newComments: INewPostCommentResponse[] = [];
    // if comment is the chiefComment change it with the incoming comment response
    if (res.comment.chiefComment) {
      newComments = comments.map((c) => {
        if (c.id === comment.id) {
          c.likes = res.comment.likes;
          c.likedByOwner = res.comment.likedByOwner;
        }
        return c;
      });
    }
    // if comment is not the chiefComment change the reply from inside change comment
    // comment.repliedTo is the parent or the chiefComment of the reply comment
    else {
      newComments = comments.map((c) => {
        if (c.id === comment.repliedTo)
          c.replies = c.replies?.map((reply) => {
            if (reply.id === comment.id) reply = res.comment;
            return reply;
          });
        return c;
      });
    }
    setComments([...newComments]);
  };

  const handleCommentDeleteClick = async (comment: INewPostCommentResponse) => {
    const res = (await runAsync(deleteComment(comment.id), catchError)) as any;

    if (res.error) return console.log(res.error);

    // After success
    // if comment is the chiefComment remove entire block
    // if not then filter the replies

    let newComments: INewPostCommentResponse[] = [];
    if (comment.chiefComment) {
      newComments = comments.filter((c) => c.id !== comment.id);
    } else {
      newComments = comments.map((c) => {
        if (c.id === comment.repliedTo)
          c.replies = c.replies?.filter(({ id }) => id !== comment.id) || [];
        return c;
      });
    }
    setComments([...newComments]);
  };

  const handleCommentEdit = async ({ commentId, content }: editedComment) => {
    const res = (await runAsync(
      updateComment(commentId, content),
      catchError
    )) as any;

    if (res.error) return console.log(res.error);

    // // After success
    // // if comment is the chiefComment remove entire block
    // // if not then filter the replies

    let newComments: INewPostCommentResponse[] = [];
    if (res.comment.chiefComment) {
      newComments = comments.map((c) => {
        if (c.id === commentId) c.content = res.comment.content;
        return c;
      });
    } else {
      newComments = comments.map((c) => {
        if (c.id === res.comment.repliedTo)
          c.replies = c.replies?.map((reply) => {
            if (reply.id === commentId) reply.content = res.comment.content;
            return reply;
          });
        return c;
      });
    }
    setComments([...newComments]);
  };

  const fetchComments = async () => {
    const res = (await runAsync(getComments(post.id), catchError)) as {
      comments?: postCommentResponse;
      error?: string;
    };

    if (res.error) return console.log(res.error);
    if (res.comments) setComments([...res.comments]);
  };

  const findLikedByOwner = async () => {
    const res = (await runAsync(isPostLikedByUser(post.id), catchError)) as any;

    if (res.error) return console.log(res.error);
    setIsPostLikedByProfileOwner(res.likedByOwner);
    setLikes(res.likesCount);
  };

  useEffect(() => {
    if (post.id) {
      fetchComments();
      findLikedByOwner();
    }
  }, [post]);

  if (!post) return null;

  const { thumbnail, title, source, author, date, tags, slug, meta, id } = post;

  return (
    <>
      {thumbnail ? (
        <div className="aspect-video relative">
          <Image
            priority
            alt={title}
            src={thumbnail}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : null}
      <div className="py-5 scroll-smooth">
        <Heading.H1>{title}</Heading.H1>
        <div className="flex justify-between items-end py-2">
          <BlogMeta author={author} date={date} />
          <Tags tags={tags} />
        </div>
        <Share title={title} meta={meta} slug={slug} />
        {source ? <MDXRemote components={components} {...source} /> : null}

        <LikeHeart
          onClick={handleOnPostLike}
          className="text-xl"
          label={likes + " likes"}
          liked={isPostLikedByProfileOwner}
        />

        <div className="p-3 border rounded border-low-contrast dark:border-low-contrast-dark mt-5">
          <div className="flex space-x-3">
            <img
              src="../images/author.png"
              className="w-20 h-20 aspect-square rounded"
              alt="author"
            />
            <div className="font-ibm_plex-500">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-high-contrast dark:text-high-contrast-dark">
                  Niraj Dhungana
                </p>
                <div className="flex space-x-3 items-center">
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.instagram.com/ndpniraj/"
                  >
                    <span className="cursor-pointer text-blue-400 text-2xl hover:scale-95 transition">
                      <FaInstagram />
                    </span>
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://twitter.com/NdpNiraj"
                  >
                    <span className="cursor-pointer text-blue-400 text-2xl hover:scale-95 transition">
                      <AiFillTwitterCircle />
                    </span>
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.youtube.com/c/FullStackNiraj"
                  >
                    <span className="cursor-pointer text-red-400 text-3xl hover:scale-90 transition">
                      <AiFillYoutube />
                    </span>
                  </a>
                </div>
              </div>
              <p className="text-low-contrast dark:text-low-contrast-dark text-lg">
                I hope you enjoyed reading this post and learned something new.
                If not then tell me how can I improve.{" "}
                <a
                  className="cursor-pointer underline font-semibold"
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://twitter.com/NdpNiraj"
                >
                  @ndpniraj
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Comment Area */}
        {authenticated ? (
          <div className="mt-10">
            <PostCommentForm
              postId={id}
              onSubmit={handleCommentSubmit}
              btnTitle="Post comment"
              placeholder="Comment your thought..."
              resetForm={resetCommentForm}
            />
          </div>
        ) : (
          <p className="py-5 text-high-contrast dark:text-high-contrast-dark text-lg ">
            Let me sign in to use comments{" "}
            <Link href={getSignInPath(asPath)}>
              <a className="font-semibold underline">login</a>
            </Link>
          </p>
        )}

        <div className="mt-10 space-y-5">
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CommentCard
                  onLikePress={handleOnCommentLike}
                  onReplySubmit={handleOnReplyCommentSubmit}
                  onDeleteClick={handleCommentDeleteClick}
                  onCommentUpdate={handleCommentEdit}
                  comment={comment}
                />

                {comment.replies?.length ? (
                  <div className="w-[93%] ml-auto space-y-3">
                    <h1 className="dark:text-low-contrast-dark text-low-contrast mb-2">
                      Replies
                    </h1>
                    {comment.replies?.map((comment) => {
                      return (
                        <CommentCard
                          key={comment.id}
                          onLikePress={handleOnCommentLike}
                          onReplySubmit={handleOnReplyCommentSubmit}
                          onDeleteClick={handleCommentDeleteClick}
                          onCommentUpdate={handleCommentEdit}
                          comment={comment}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
