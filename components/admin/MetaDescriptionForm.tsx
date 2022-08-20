import React, { ChangeEventHandler, FC } from "react";

interface Props {
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const MetaDescriptionForm: FC<Props> = ({
  value = "",
  onChange,
}): JSX.Element => {
  return (
    <div className="relative">
      <textarea
        name="meta"
        value={value}
        onChange={onChange}
        placeholder="Meta description 150 characters will be fine"
        className=" resize-none w-full h-20 outline-none dark:bg-secondary-dark dark:text-low-contrast-dark bg-secondary text-low-contrast text-lg p-2 font-ibm_plex-500"
      ></textarea>
      <p className="absolute right-3 bottom-3 text-xs text-gray-500 ">
        {value.length}/150
      </p>
    </div>
  );
};

export default MetaDescriptionForm;
