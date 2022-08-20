import React, { ChangeEventHandler, FC } from "react";

interface Props {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}

const SlugInput: FC<Props> = ({ value, onChange, onBlur }): JSX.Element => {
  return (
    <div className="flex items-center rounded space-x-2 font-ibm_plex-400 dark:bg-secondary-dark bg-secondary ::before p-2 transition dark:text-low-contrast-dark text-high-contrast">
      <span className="text-xs">Slug: </span>
      <input
        className="w-full flex-grow border-none outline-none dark:placeholder-low-contrast-dark placeholder-low-contrast block bg-transparent dark:text-high-contrast-dark text-high-contrast italic"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="/slug-goes-here"
      />
    </div>
  );
};

export default SlugInput;
