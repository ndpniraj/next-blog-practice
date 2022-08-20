import { useRouter } from "next/router";
import { FC, MouseEventHandler } from "react";
import { dateFormat } from "../utils/helper";

interface Props {
  title: string;
  slug: string;
  desc: string;
  date: string;
  controls?: boolean;
}

const PostCard: FC<Props> = ({ slug, title, desc, date, controls = false }) => {
  const router = useRouter();

  return (
    <div className="dark:bg-secondary-dark bg-secondary shadow-sm dark:shadow-secondary-dark shadow-secondary p-2 rounded space-y-2 transition">
      <h1 className="text-xl dark:text-high-contrast-dark text-high-contrast transition font-ibm_plex-500">
        {title}
      </h1>
      <p className="dark:text-low-contrast-dark text-low-contrast transition font-ibm_plex-500">
        {desc}
      </p>

      {/* <div className="flex items-center space-x-2 text-sm dark:text-low-contrast-dark text-low-contrast">
        <span>Status</span>
        <span>public</span>
      </div> */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm dark:text-low-contrast-dark text-low-contrast transition font-semibold">
          <span>{dateFormat(date)}</span>
        </div>

        {controls ? (
          <Controls
            onEditClick={() => router.push("/admin/update?post_slug=" + slug)}
          />
        ) : null}
      </div>
    </div>
  );
};

interface ControlsProps {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const Controls: FC<ControlsProps> = ({ onEditClick, onDeleteClick }) => {
  const className =
    "dark:bg-low-contrast-dark bg-low-contrast dark:text-primary-dark text-primary px-4 py-1 rounded hover:scale-105 transition";

  return (
    <div className="flex items-center space-x-5">
      <button onClick={onEditClick} type="button" className={className}>
        Edit
      </button>
      <button onClick={onDeleteClick} type="button" className={className}>
        Delete
      </button>
    </div>
  );
};

export default PostCard;
