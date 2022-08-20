import { FC } from "react";
import { getNameInitial } from "../utils/helper";

interface Props {
  name: string;
  size?: number;
  darkOnly?: boolean;
}

const ProfileIcon: FC<Props> = ({ name, darkOnly, size }): JSX.Element => {
  const getStyles = () => {
    let classes: string = "";

    // adding size
    if (size) classes = `w-${size} h-${size}`;
    else classes = "w-12 h-12";

    if (darkOnly) classes += " bg-primary text-primary-dark";
    else
      classes +=
        " bg-primary-dark dark:bg-primary text-white dark:text-primary-dark";

    return classes;
  };

  return (
    <div
      className={
        "flex items-center justify-center rounded-full select-none " +
        getStyles()
      }
    >
      {getNameInitial(name)}
    </div>
  );
};

export default ProfileIcon;
