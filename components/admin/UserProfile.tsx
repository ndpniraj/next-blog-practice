import { FC } from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { getNameInitial } from "../../utils/helper";

interface Props {
  name: string;
  email: string;
  //   likesCount: string | number;
  //   commentsCount: string | number;
}

const UserProfile: FC<Props> = ({
  name,
  email,
  //   likesCount,
  //   commentsCount,
}): JSX.Element => {
  return (
    <div className="flex space-x-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-dark dark:bg-primary text-white dark:text-primary-dark text-lg select-none">
        {getNameInitial(name)}
      </div>
      <div>
        <h1 className="dark:text-high-contrast-dark text-high-contrast font-semibold text-lg">
          {name}
        </h1>
        <p className="dark:text-high-contrast-dark text-high-contrast text-sm">
          {email}
        </p>
        {/* <div className="flex items-center space-x-3 py-1">
          <p className="flex items-center space-x-1">
            <AiOutlineLike />
            <span>likes: </span>
            <span className="font-semibold">{likesCount}</span>
          </p>
          <p className="flex items-center space-x-1">
            <AiOutlineComment />
            <span>Comments: </span>
            <span className="font-semibold">{commentsCount}</span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
