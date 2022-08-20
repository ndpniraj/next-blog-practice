import { FC, ReactNode, useState } from "react";
import parseHtml from "html-react-parser";
import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";

import { INewPostCommentResponse } from "../utils/types";
import { dateFormat, getNameInitial, runAsync } from "../utils/helper";
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsHeart,
  BsHeartFill,
  BsPencilSquare,
} from "react-icons/bs";
import PostCommentForm from "./PostCommentForm";
import { useSession } from "next-auth/react";
import { ContentState, convertFromRaw } from "draft-js";
import LikeHeart from "./LikeHeart";
import ProfileIcon from "./ProfileIcon";

export type editedComment = {
  content: string;
  commentId: string;
};

interface Props {
  comment: INewPostCommentResponse;
  children?: ReactNode;
  onLikePress?: (comment: INewPostCommentResponse) => void;
  onDeleteClick?: (comment: INewPostCommentResponse) => void;
  onReplySubmit?: (data: { content: string; repliedTo: string }) => void;
  onCommentUpdate?: (data: editedComment) => void;
}

const convertToJsx = (data: string) => {
  const html = draftToHtml(JSON.parse(data));
  return parseHtml(sanitize(html), {
    replace: (domNode: any) => {
      if (domNode.name === "a")
        return (
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-400 underline"
            {...domNode.attribs}
          >
            {domNode.children[0].data}
          </a>
        );
    },
  });
};

const CommentCard: FC<Props> = ({
  comment,
  onLikePress,
  onReplySubmit,
  onCommentUpdate,
  onDeleteClick,
}): JSX.Element => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [commentToUpdate, setCommentToUpdate] = useState<ContentState>();
  const { data } = useSession();
  const user = data?.user as { id: string };

  const isOwnersComment = user && user.id === comment.owner?.id;

  const getHeartIcon = () => {
    if (comment.likedByOwner) return <BsHeartFill color="#4790FD" size={16} />;
    return <BsHeart size={16} />;
  };

  const displayCommentReplyForm = () => {
    setShowReplyForm(true);
  };

  const handleOnCommentSubmit = (content: string) => {
    // it means this is edit not new reply
    if (commentToUpdate)
      onCommentUpdate && onCommentUpdate({ content, commentId: comment.id });
    else
      onReplySubmit &&
        onReplySubmit({
          content,
          repliedTo: comment.repliedTo || comment.id,
        });

    setShowReplyForm(false);
    setCommentToUpdate(undefined);
  };

  const handleOnEditClick = (comment: INewPostCommentResponse) => {
    const draftData = JSON.parse(comment.content);
    const rawData = convertFromRaw(draftData);
    setCommentToUpdate(rawData);
    setShowReplyForm(true);
  };

  const { owner, content, createdAt, likes } = comment;

  return (
    <div key={comment.id} className="flex space-x-3">
      {/* <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-dark dark:bg-primary text-white dark:text-primary-dark text-xl select-none">
        {getNameInitial(owner.name)}
      </div> */}
      <ProfileIcon name={owner.name} />
      <div className="flex-1">
        <h1 className="dark:text-high-contrast-dark text-low-contrast font-semibold text-lg">
          {owner.name}
        </h1>
        <span className="text-sm dark:text-low-contrast-dark text-low-contrast">
          {createdAt && dateFormat(createdAt)}
        </span>
        <div className="dark:text-high-contrast-dark text-low-contrast text-lg">
          {convertToJsx(content)}
        </div>
        <div className="py-2 flex items-center space-x-4">
          <LikeHeart
            onClick={() => onLikePress && onLikePress(comment)}
            label={likes + " likes"}
            liked={comment.likedByOwner}
          />
          <Button onClick={displayCommentReplyForm}>
            <BsFillReplyAllFill size={18} />{" "}
            <span className="sm:block hidden">Reply</span>
          </Button>
          {isOwnersComment && (
            <>
              <Button onClick={() => handleOnEditClick(comment)}>
                <BsPencilSquare size={18} />{" "}
                <span className="sm:block hidden">Edit</span>
              </Button>
              <Button onClick={() => onDeleteClick && onDeleteClick(comment)}>
                <BsFillTrashFill size={18} />{" "}
                <span className="sm:block hidden">Delete</span>
              </Button>
            </>
          )}
        </div>

        {/* To Render Comment Reply Form */}
        {showReplyForm && (
          <PostCommentForm
            initialState={commentToUpdate}
            postId={comment.belongsTo}
            onSubmit={handleOnCommentSubmit}
            btnTitle={commentToUpdate ? "Update comment" : "Add reply"}
            placeholder="Add you reply..."
          />
        )}
      </div>
    </div>
  );
};

const Button: FC<{
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="dark:text-low-contrast-dark text-low-contrast text-sm flex items-center space-x-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CommentCard;
