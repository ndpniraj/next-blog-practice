import { FC, useRef, useState, ReactNode, useEffect } from "react";
import {
  BsLink,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
} from "react-icons/bs";
import {
  Editor,
  EditorState,
  DraftHandleValue,
  RichUtils,
  ContentBlock,
  ContentState,
  CompositeDecorator,
  convertToRaw,
} from "draft-js";
import Button from "./editor/Button";
import "draft-js/dist/Draft.css";
import { UrlInput } from "./editor/Toolbar";

interface Props {
  postId: string;
  onSubmit?: (content: string) => void;
  btnTitle: string;
  placeholder?: string;
  resetForm?: boolean;
  initialState?: ContentState;
}

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link: FC<{
  contentState: ContentState;
  entityKey: string;
  children: ReactNode;
}> = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      href={url}
      className="text-blue-400 underline"
    >
      {children}
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const PostCommentForm: FC<Props> = ({
  btnTitle,
  placeholder,
  resetForm,
  initialState,
  onSubmit,
}): JSX.Element => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  );
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [urlToLink, setUrlToLink] = useState("");
  const draftEditor = useRef<Editor>(null);

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const validCommands = ["bold", "italic", "underline"];
    if (validCommands.includes(command)) {
      updateEditorInlineStyle(command);
      return "handled";
    }

    return "not-handled";
  };

  const updateEditorInlineStyle = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
  };

  const handleOnEditorCommand = (command: string) => {
    if (command === "link") {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();

      if (!selection.isCollapsed()) {
        setShowLinkForm(true);
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

        if (linkKey) {
          const linkInstance = contentState.getEntity(linkKey);
          let url = linkInstance.getData().url;
          try {
            url = new URL(url);
          } catch (error) {
            url = new URL("http://" + url);
          }
          setUrlToLink(url.origin);
        }
      }
      return;
    }

    const validCommands = ["bold", "italic", "underline"];
    if (validCommands.includes(command)) updateEditorInlineStyle(command);

    setTimeout(() => {
      draftEditor.current?.focus();
    }, 0);
  };

  const appendLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlToLink }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    newEditorState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    );
    setEditorState(newEditorState);
    setTimeout(() => {
      draftEditor.current?.focus();
    }, 0);
    setUrlToLink("");
    setShowLinkForm(false);
  };

  const isActiveStyle = (style: string): boolean => {
    return editorState.getCurrentInlineStyle().has(style);
  };

  const isLinkAttached = () => {
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    if (linkKey) return true;

    return false;
  };

  const handleOnEditorStateChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleLinkFormCancel = () => {
    setShowLinkForm(false);
    setUrlToLink("");
  };

  const handleSubmit = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    let isValid = false;

    for (let block of content.blocks) {
      if (block.text.trim()) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      onSubmit && onSubmit(JSON.stringify(content));
    } else {
      console.log("TODO: invalid comment add notification");
    }
  };

  const handleUrlChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    let url: URL;
    const { value } = target;
    try {
      url = new URL(value);
    } catch (error) {
      url = new URL("http://" + value);
    }
    setUrlToLink(url.origin);
  };

  useEffect(() => {
    if (resetForm) setEditorState(EditorState.createEmpty(decorator));
  }, [resetForm]);

  useEffect(() => {
    if (initialState)
      setEditorState(EditorState.createWithContent(initialState));
  }, [initialState]);

  return (
    <div className="border-2 dark:border-low-contrast-dark border-low-contrast rounded">
      <div
        className="min-h-[9rem] max-h-36 p-2 overflow-y-auto dark:text-high-contrast-dark text-high-contrast cursor-text"
        onClick={() => draftEditor.current?.focus()}
      >
        <Editor
          ref={draftEditor}
          editorState={editorState}
          onChange={handleOnEditorStateChange}
          handleKeyCommand={handleKeyCommand}
          spellCheck
          placeholder={placeholder}
        />
      </div>

      <div className="dark:bg-secondary-dark bg-secondary p-1 md:flex items-center justify-between md:space-y-0 space-y-3">
        <div className="flex items-center space-x-3">
          {!showLinkForm && (
            <>
              <Button
                active={isActiveStyle("BOLD")}
                onClick={() => handleOnEditorCommand("bold")}
                toolTip="Bold"
              >
                <BsTypeBold />
              </Button>
              <Button
                active={isActiveStyle("ITALIC")}
                onClick={() => handleOnEditorCommand("italic")}
                toolTip="Italic"
              >
                <BsTypeItalic />
              </Button>
              <Button
                active={isActiveStyle("UNDERLINE")}
                onClick={() => handleOnEditorCommand("underline")}
                toolTip="Link"
              >
                <BsTypeUnderline />
              </Button>
              <Button
                active={isLinkAttached()}
                onClick={() => handleOnEditorCommand("link")}
                toolTip="Link"
              >
                <BsLink />
              </Button>
            </>
          )}

          <UrlInput
            visible={showLinkForm}
            value={urlToLink}
            onCancel={handleLinkFormCancel}
            onConfirm={appendLink}
            onChange={handleUrlChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-3 py-2 rounded md:w-auto w-full"
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

/*
https://codesandbox.io/s/gpkjs?file=/src/App.js:2533-2547
*/

/*
() => {
const ranges = convertToRaw(editorState.getCurrentContent())
blocks[0].entityRanges;

const cursorOffset = editorState
  .getSelection()
  .getStartOffset();
const offsets = ranges.map(({ offset }) => offset);

var closest = offsets.reduce(function (prev, curr) {
  return Math.abs(curr - cursorOffset) <
    Math.abs(prev - cursorOffset)
    ? curr
    : prev;
});

const test = ranges.find(({ offset }) => offset === closest);
if (test) {
  const selectionRange = {
    start: test.offset,
    end: test.length + test.offset,
  };
  // const newSelection = editorState.getSelection().merge({
  //   focusOffset: selectionRange.start,
  //   anchorOffset: selectionRange.end,
  // });
  const sel = EditorState.forceSelection(
    editorState,
    editorState.getSelection().merge({
      focusOffset: selectionRange.start,
      anchorOffset: selectionRange.end,
    })
);

setEditorState(
  RichUtils.toggleLink(
    editorState,
    sel.getSelection(),
    null
  )
);
// editorState.getSelection().merge({
//   focusOffset: selectionRange.start,
//   anchorOffset: selectionRange.end,
// });
}

//   console.log(editorState.getSelection().getStartOffset());
//   console.log();
//   console.log(
//     convertToRaw(editorState.getCurrentContent()).blocks
//   );
// setEditorState(
//   RichUtils.toggleLink(
//     editorState,
//     newSelection,
//     null
//   )
// );
}
*/

export default PostCommentForm;
