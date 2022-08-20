import { FC, useEffect, useState } from "react";
import { getAllComments } from "../../utils/comment";
import { catchError, runAsync } from "../../utils/helper";
import { postCommentResponse } from "../../utils/types";
import CommentCard from "./CommentCard";

interface Props {}

let currentPageNo = 0;
const limit = 5;

const Comments: FC<Props> = (): JSX.Element => {
  const [comments, setComments] = useState<postCommentResponse>([]);

  const fetchComments = async (pageNo: number) => {
    const res = (await runAsync(getAllComments(pageNo, limit), catchError)) as {
      comments?: postCommentResponse;
      error?: string;
    };

    if (res.error) return console.log(res.error);
    if (res.comments) setComments([...res.comments]);
  };

  useEffect(() => {
    fetchComments(currentPageNo);
  }, []);

  return (
    <div className="space-y-5">
      {comments.map((c) => (
        <div key={c.id}>
          <CommentCard comment={c} key={c.id} />
          {c.replies?.length ? (
            <div className="w-[93%] ml-auto space-y-3">
              <h1 className="dark:text-low-contrast-dark text-low-contrast mb-2">
                Replies
              </h1>
              {c.replies?.map((comment) => {
                return (
                  <CommentCard
                    key={comment.id}
                    //   onLikePress={handleOnCommentLike}
                    //   onReplySubmit={handleOnReplyCommentSubmit}
                    //   onDeleteClick={handleCommentDeleteClick}
                    //   onCommentUpdate={handleCommentEdit}
                    comment={comment}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Comments;
