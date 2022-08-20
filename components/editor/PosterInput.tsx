import { ChangeEvent, FC } from "react";
import { BsCardImage } from "react-icons/bs";

interface Props {
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const acceptedFileTypes = ["image/jpg", "image/jpeg", "image/png"];

const PosterInput: FC<Props> = ({ label, onChange }) => {
  return (
    <div className="">
      <input
        onChange={onChange}
        type="file"
        id="poster-input"
        hidden
        accept={acceptedFileTypes.join(", ")}
      />
      <label htmlFor="poster-input">
        <div className="inline-flex items-center space-x-3 cursor-pointer dark:text-low-contrast-dark text-low-contrast hover:scale-95 transition">
          <BsCardImage />
          <span>{label}</span>
        </div>
      </label>
    </div>
  );
};

export default PosterInput;
