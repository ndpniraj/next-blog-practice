import React, { FC, useState } from "react";
import { IconType } from "react-icons";
import {
  BsBraces,
  BsCode,
  BsLink,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeItalic,
  BsYoutube,
} from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import Button from "./Button";
import { useEditor } from "./EditorProvider";
import { styleTypes } from "../../utils/types";

const ToolBar: FC = (): JSX.Element => {
  const [showYouTubeForm, setShowYouTubeForm] = useState<boolean>(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const {
    markBold,
    markBlockQuote,
    markItalic,
    markInlineCode,
    markCodeBlock,
    markHeader,
    markUnOrderedList,
    markOrderedList,
    markLink,
    embedYoutubeLink,
  } = useEditor();

  const openYoutubeForm = () => {
    setShowYouTubeForm(true);
  };

  const handleOnYouTubeLinkConfirm = () => embedYoutubeLink(youtubeUrl);

  const handleOnClick = (style: styleTypes) => {
    if (style === "bold") return markBold();
    if (style === "italic") return markItalic();
    if (style === "blockquote") return markBlockQuote();
    if (style === "code") return markInlineCode();
    if (style === "code-block") return markCodeBlock();
    if (style === "h1") return markHeader(1);
    if (style === "h2") return markHeader(2);
    if (style === "h3") return markHeader(3);
    if (style === "ul") return markUnOrderedList();
    if (style === "ol") return markOrderedList();
    if (style === "link") return markLink();
    if (style === "youtube") return openYoutubeForm();
  };

  return (
    <div className="flex space-x-6 p-2 z-50 sticky top-0 dark:bg-secondary-dark bg-secondary ::before rounded transition">
      {!showYouTubeForm ? (
        <div className="space-x-3">
          {STYLE_TYPES.map(({ IconName, label, style }, index) => {
            return (
              <Button
                onClick={() => handleOnClick(style)}
                key={label + index}
                toolTip={label}
              >
                <IconName />
              </Button>
            );
          })}
        </div>
      ) : null}
      <UrlInput
        onCancel={() => setShowYouTubeForm(false)}
        onConfirm={handleOnYouTubeLinkConfirm}
        visible={showYouTubeForm}
        value={youtubeUrl}
        onChange={({ target }) => setYoutubeUrl(target.value)}
      />
    </div>
  );
};

export const UrlInput: FC<{
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  visible: boolean;
}> = ({ visible, value, onConfirm, onCancel, onChange }) => {
  const getTitle = () => (value ? "Update" : "Insert");

  if (!visible) return null;

  return (
    <div className="h-full flex items-center space-x-3">
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder="https://www.youtube.com/watch?v=1234"
        className="outline-none h-full w-64 bg-transparent dark:text-low-contrast-dark text-low-contrast font-ibm_plex-400 p-1"
      />
      <button
        onClick={onConfirm}
        className="dark:text-high-contrast-dark text-high-contrast px-4 rounded p-1 transition"
      >
        {getTitle()}
      </button>
      <button
        onClick={onCancel}
        className="dark:text-high-contrast-dark text-high-contrast px-4 rounded p-1 transition"
      >
        Cancel
      </button>
    </div>
  );
};

const STYLE_TYPES: { IconName: IconType; label: string; style: styleTypes }[] =
  [
    {
      IconName: BsTypeBold,
      label: "Bold Ctrl+b",
      style: "bold",
    },
    {
      IconName: BsTypeItalic,
      label: "Italic Ctrl+i",
      style: "italic",
    },
    {
      IconName: BsLink,
      label: "Link",
      style: "link",
    },
    {
      IconName: BsTypeH1,
      label: "Heading 1",
      style: "h1",
    },
    {
      IconName: BsTypeH2,
      label: "Heading 2",
      style: "h2",
    },
    {
      IconName: BsTypeH3,
      label: "Heading 3",
      style: "h3",
    },
    {
      IconName: RiDoubleQuotesL,
      label: "Block Quote",
      style: "blockquote",
    },
    {
      IconName: BsListUl,
      label: "List",
      style: "ul",
    },
    {
      IconName: BsListOl,
      label: "Order List",
      style: "ol",
    },
    {
      IconName: BsCode,
      label: "Code",
      style: "code",
    },
    {
      IconName: BsBraces,
      label: "Code Block",
      style: "code-block",
    },
    {
      IconName: BsYoutube,
      label: "Embed YouTube Video",
      style: "youtube",
    },
  ];

export default ToolBar;
