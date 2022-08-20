import React, { FC } from "react";

interface Props {
  onPrevClick?: React.MouseEventHandler;
  onNextClick?: React.MouseEventHandler;
  className?: string;
}

const PageNavigator: FC<Props> = ({
  onPrevClick,
  onNextClick,
  className = "",
}): JSX.Element => {
  const getClasses = () => {
    return "flex justify-end items-center space-x-3 ";
  };

  return (
    <div className={getClasses() + className}>
      <Button onClick={onPrevClick} title="Prev" />
      <Button onClick={onNextClick} title="Next" />
    </div>
  );
};

const Button: FC<{ title: string; onClick?: React.MouseEventHandler }> = ({
  title,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="text-high-contrast dark:text-high-contrast-dark hover:underline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PageNavigator;
