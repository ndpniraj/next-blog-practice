import { useSession } from "next-auth/react";
import { FC, ReactNode } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

type btnClickEvent = React.MouseEventHandler<HTMLButtonElement>;

interface Props {
  onClick?: btnClickEvent;
  label?: string;
  liked?: boolean;
  className?: string;
}

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  className,
  onClick,
}): JSX.Element => {
  return (
    <Button className={className} onClick={onClick}>
      {liked ? <BsHeartFill color="#4790FD" /> : <BsHeart />}
      <span>{label}</span>
    </Button>
  );
};

const Button: FC<{
  children: ReactNode;
  className?: string;
  onClick?: btnClickEvent;
}> = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      className={
        "dark:text-low-contrast-dark text-low-contrast flex items-center space-x-2 outline-none " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LikeHeart;
