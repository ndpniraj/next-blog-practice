import React, { ChangeEventHandler, FC } from "react";
import { topics } from "../../utils/types";

interface Props {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onTopicSelect?: (topic: topics) => void;
  // onBlur?: ChangeEventHandler<HTMLInputElement>;
}

const TOPICS: topics[] = [
  "React",
  "React Native",
  "JavaScript",
  "Kotlin",
  "Next JS",
  "Node JS",
];

const TopicSelector: FC<Props> = ({
  value,
  onChange,
  onTopicSelect,
}): JSX.Element => {
  return (
    <div>
      <input
        type="text"
        className="p-1 border-2 dark:border-low-contrast-dark border-low-contrast rounded bg-transparent outline-none dark:text-low-contrast-dark text-low-contrast"
        placeholder="Topic"
        value={value}
        onChange={() => {}}
      />
      <div className="mt-3 text-low-contrast-dark dark:text-low-contrast-dark">
        <p className="font-semibold text-sm">Select From These</p>
        {TOPICS.map((topic) => (
          <button
            onClick={() => onTopicSelect && onTopicSelect(topic)}
            key={topic}
            className="underline mr-2 text-sm"
          >
            {topic}
          </button>
        ))}
      </div>
      {/* <button className="flex items-center space-x-2 px-2 py-1 bg dark:bg-secondary-dark dark:text-high-contrast-dark bg-low-contrast text-primary transition">
  <BsPlus />
  <span>Add new</span>
</button> */}
    </div>
  );
};

export default TopicSelector;
