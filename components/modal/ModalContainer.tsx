import React, { FC, ReactNode, useId } from "react";

interface Props {
  visible: boolean;
  children: ReactNode;
  onClose?(): void;
}

const ModalContainer: FC<Props> = ({ visible, children, onClose }) => {
  const containerId = useId();

  const handleClick: React.MouseEventHandler = (e) => {
    if ((e.target as HTMLDivElement).id === containerId) onClose && onClose();
  };

  if (!visible) return null;
  return (
    <div
      onClick={handleClick}
      id={containerId}
      className="fixed inset-0 z-50 bg-primary dark:bg-primary-dark dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
