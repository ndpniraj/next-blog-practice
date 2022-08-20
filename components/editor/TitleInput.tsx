import { ChangeEvent, FC } from "react";

interface Props {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput: FC<Props> = ({ value, onChange }): JSX.Element => {
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        className="text-3xl dark:placeholder-low-contrast-dark placeholder-low-contrast dark:text-low-contrast-dark text-high-contrast block w-full bg-transparent outline-none tracking-wide font-ibm_plex-500 transition"
        type="text"
        placeholder="New Post Title..."
        spellCheck
      />
    </div>
  );
};

export default TitleInput;
