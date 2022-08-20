import { FC, ReactNode, useState } from "react";

interface Props {
  head: JSX.Element;
  options: { label: string; onClick: () => any }[];
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <button
      onBlur={() => setShowOptions(false)}
      onClick={() => setShowOptions(!showOptions)}
      className="flex space-x-2 items-center relative"
    >
      {head}
      {showOptions && (
        <span className="dark:text-high-contrast-dark text-low-contrast min-w-max border-2 dark:border-low-contrast-dark border-low-contrast rounded absolute top-full mt-4 right-2 bg-primary dark:bg-primary-dark text-left">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => (
              <li>
                <button key={index} onMouseDown={onClick}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </span>
      )}
    </button>
  );
};

export default DropdownOptions;
