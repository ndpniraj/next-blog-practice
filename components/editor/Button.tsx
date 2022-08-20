import React, { FC, MouseEventHandler, ReactNode, useCallback } from "react";

interface Props {
  children: ReactNode;
  toolTip?: string;
  active?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({
  toolTip,
  children,
  active,
  onMouseDown,
  onClick,
}): JSX.Element => {
  const getActiveStyle = useCallback((): string => {
    return active
      ? " dark:bg-primary dark:text-high-contrast bg-primary-dark text-white "
      : " dark:bg-primary-dark dark:text-high-contrast-dark bg-primary text-high-contrast";
  }, [active]);

  const commonClasses =
    "group p-2 rounded text-lg hover:scale-110 hover:shadow-md transition";
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={commonClasses + getActiveStyle()}
    >
      {children}
      {toolTip ? (
        <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition absolute -bottom-8 p-1 text-xs rounded-sm dark:bg-high-contrast dark:text-primary bg-high-contrast text-primary whitespace-nowrap">
          {toolTip}
        </span>
      ) : null}
    </button>
  );
};

export default Button;
