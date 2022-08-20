import {
  createContext,
  KeyboardEventHandler,
  FC,
  ReactNode,
  useContext,
  useRef,
  useState,
  ChangeEventHandler,
} from "react";
import isHotkey from "is-hotkey";
import {
  insertYoutubeLink,
  redoHistory,
  saveHistory,
  toggleBlockCodeStyle,
  toggleBlockQuoteStyle,
  toggleBoldStyle,
  toggleHeaderStyle,
  toggleInlineCode,
  toggleItalicStyle,
  toggleLinkStyle,
  toggleOrderedListStyle,
  toggleUnOrderedListStyle,
  undoHistory,
} from "./editorHelpers";

export const POST_IDENTIFIER = "ndp_post";

interface Props {
  children: ReactNode;
  showEditor?: boolean;
  onChange?: (value: string | undefined) => void;
  value?: string;
}

interface EditorContext {
  markBold: () => void;
  markItalic: () => void;
  markBlockQuote: () => void;
  markInlineCode: () => void;
  markCodeBlock: () => void;
  markHeader: (headerStyle: number) => void;
  markUnOrderedList: () => void;
  markOrderedList: () => void;
  markLink: () => void;
  embedYoutubeLink: (url: string) => void;
}

const EditorContext = createContext<EditorContext>({
  markBold: () => {},
  markItalic: () => {},
  markBlockQuote: () => {},
  markInlineCode: () => {},
  markCodeBlock: () => {},
  markHeader: () => {},
  markUnOrderedList: () => {},
  markOrderedList: () => {},
  markLink: () => {},
  embedYoutubeLink: () => {},
});

const EditorProvider: FC<Props> = ({
  showEditor = true,
  children,
  value,
  onChange,
}): JSX.Element => {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const getEditor = () => textarea.current || null;

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (!e.ctrlKey) return true;

    if (isHotkey("mod+b", e)) markBold();
    if (isHotkey("mod+i", e)) markItalic();
    if (isHotkey("mod+`", e)) markInlineCode();

    // handle undo
    if (isHotkey("mod+z", e)) {
      e.preventDefault();
      const updatedContent = undoHistory(history);
      onChange && onChange(updatedContent);
    }

    // handle redo
    if (isHotkey("mod+y", e)) {
      e.preventDefault();
      const updatedContent = redoHistory(history);
      onChange && onChange(updatedContent);
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    const newValue = target.value;
    setHistory(saveHistory(history, newValue));
    onChange && onChange(newValue);
  };

  const markBold = () => {
    const editor = getEditor();
    if (!editor) return;
    const newContent = toggleBoldStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markItalic = () => {
    const editor = getEditor();
    if (!editor) return;
    const newContent = toggleItalicStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markBlockQuote = () => {
    const editor = getEditor();
    if (!editor) return;
    const newContent = toggleBlockQuoteStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markInlineCode = () => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = toggleInlineCode(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markCodeBlock = () => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = toggleBlockCodeStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markHeader = (headerStyle: number) => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = toggleHeaderStyle(editor, headerStyle);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markUnOrderedList = () => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = toggleUnOrderedListStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markOrderedList = () => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = toggleOrderedListStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const markLink = () => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = toggleLinkStyle(editor);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  const embedYoutubeLink = (url: string) => {
    const editor = getEditor();
    if (!editor) return;

    const newContent = insertYoutubeLink(editor, url);
    setHistory(saveHistory(history, newContent));
    onChange && onChange(newContent);
  };

  return (
    <div className="h-full flex flex-col space-y-3 dark:bg-primary-dark bg-primary">
      <EditorContext.Provider
        value={{
          markBold,
          markItalic,
          markBlockQuote,
          markInlineCode,
          markCodeBlock,
          markHeader,
          markUnOrderedList,
          markOrderedList,
          markLink,
          embedYoutubeLink,
        }}
      >
        {children}

        {showEditor ? (
          <textarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={textarea}
            className="custom-scroll-bar resize-none w-full flex-1 outline-none dark:bg-secondary-dark dark:text-low-contrast-dark bg-secondary text-low-contrast text-lg p-2 font-ibm_plex-500"
            spellCheck="true"
            lang="en"
          />
        ) : null}
      </EditorContext.Provider>
    </div>
  );
};

export const useEditor = () => useContext(EditorContext);
export default EditorProvider;
