import markdownSyntax, { getHeaderStyleSymbols } from "./markdownSyntax";
import { editor } from "../../utils/types";

export const toggleBoldStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { value, alreadyBold, selectionStart, selectionEnd } =
    isAlreadyBold(editor);
  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyBold) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.bold(selectedText);
    updatedSelectionStartPoint = selectionStart + 2;
    updatedSelectionEndPoint = selectionEnd + 2;
  }

  if (alreadyBold) {
    updatedSelection = value;
    /**
     * Here we want to subtract the selection of those 4 start
     * 2 from the beginning and 2 from the end and because inside isAlreadyBold method
     * we are already manipulating their value.
     * we have subtracted 2 from the start and added 2 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before bold.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - 4;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleItalicStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { alreadyItalic, nonItalicValue, selectionStart, selectionEnd } =
    isAlreadyItalic(editor);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyItalic) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.italic(selectedText);
    updatedSelectionStartPoint = selectionStart + 1;
    updatedSelectionEndPoint = selectionEnd + 1;
  }

  if (alreadyItalic) {
    updatedSelection = nonItalicValue;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - 2;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleBlockQuoteStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { alreadyBlockQuote, nonQuotedValue, selectionStart, selectionEnd } =
    isAlreadyBlockQuote(editor);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyBlockQuote) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.quote(selectedText);
    updatedSelectionStartPoint = selectionStart + 2;
    updatedSelectionEndPoint = selectionEnd + 2;
  }

  if (alreadyBlockQuote) {
    updatedSelection = nonQuotedValue;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - 2;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleUnOrderedListStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { alreadyUL, nonULValue, selectionStart, selectionEnd } =
    isAlreadyUL(editor);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyUL) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.unOrderedList(selectedText);
    updatedSelectionStartPoint = selectionStart + 2;
    updatedSelectionEndPoint = selectionEnd + 2;
  }

  if (alreadyUL) {
    updatedSelection = nonULValue;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - 2;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleOrderedListStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const {
    alreadyOL,
    list,
    nonOLValue,
    selectionStart,
    selectionEnd,
    previousSelectionLength,
  } = isAlreadyOL(editor);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyOL) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.orderedList(list);
    const difference = updatedSelection.length - selectedText.length;
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd + difference;
  }

  if (alreadyOL) {
    updatedSelection = nonOLValue;
    const difference = previousSelectionLength - updatedSelection.length;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - difference;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleInlineCode = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { alreadyInline, nonInlineCode, selectionStart, selectionEnd } =
    isAlreadyInlineCode(editor);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyInline) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.inlineCode(selectedText);
    updatedSelectionStartPoint = selectionStart + 1;
    updatedSelectionEndPoint = selectionEnd + 1;
  }

  if (alreadyInline) {
    updatedSelection = nonInlineCode;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - 2;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleBlockCodeStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { nonBlockCode, alreadyBlockCode, selectionStart, selectionEnd } =
    isAlreadyBlockCode(editor);
  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyBlockCode) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.codeBlock(selectedText);
    updatedSelectionStartPoint = selectionStart + 3;
    updatedSelectionEndPoint = selectionEnd + 3;
  }

  if (alreadyBlockCode) {
    updatedSelection = nonBlockCode;
    /**
     * Here we want to subtract the selection of those 4 start
     * 2 from the beginning and 2 from the end and because inside isAlreadyBold method
     * we are already manipulating their value.
     * we have subtracted 2 from the start and added 2 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before bold.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - 6;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleHeaderStyle = (editor: editor, headerStyle: number) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { alreadyHeader, nonHeaderValue, selectionStart, selectionEnd } =
    isAlreadyHeader(editor, headerStyle);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyHeader) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.header(selectedText, headerStyle);
    updatedSelectionStartPoint = selectionStart + headerStyle + 1;
    updatedSelectionEndPoint = selectionEnd + headerStyle + 1;
  }

  if (alreadyHeader) {
    updatedSelection = nonHeaderValue;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd - headerStyle + 1;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  Selection.updateSelection(
    editor,
    updatedSelectionStartPoint,
    updatedSelectionEndPoint
  );
  return finalContent;
};

export const toggleLinkStyle = (editor: editor) => {
  if (!editor) return;
  let updatedSelection = "";
  let updatedSelectionStartPoint = 0;
  let updatedSelectionEndPoint = 0;
  const editorContent = editor.value;

  const { alreadyLinked, nonLinkedText, selectionStart, selectionEnd } =
    isAlreadyLinked(editor);

  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    editorContent,
    selectionStart,
    selectionEnd
  );

  if (!alreadyLinked) {
    const selectedText = Selection.selectedText(
      editorContent,
      selectionStart,
      selectionEnd
    );

    updatedSelection = markdownSyntax.link(selectedText);
    updatedSelectionStartPoint = selectionStart + selectedText.length + 3;
    updatedSelectionEndPoint = selectionEnd + selectedText.length + 2;
  }

  if (alreadyLinked) {
    updatedSelection = nonLinkedText;
    /**
     * Here we want to subtract the selection of those 2 underscore
     * 1 from the beginning and 1 from the end and because inside isAlreadyItalic method
     * we are already manipulating their value.
     * we have subtracted 1 from the start and added 1 at the end of selection value.
     * so we have to bring back our selectionEnd to where it was before italic.
     **/
    updatedSelectionStartPoint = selectionStart;
    updatedSelectionEndPoint = selectionEnd;
  }

  const finalContent = beforeSelection + updatedSelection + afterSelection;
  editor.value = finalContent;

  // Selection.updateSelection(
  //   editor,
  //   updatedSelectionStartPoint,
  //   updatedSelectionEndPoint
  // );
  editor.focus();
  return finalContent;
};

const isAlreadyBold = (editor: editor) => {
  /**
   * Taking out value and the selection range from inside editor (textarea)
   **/
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    value: "",
    selectionStart,
    selectionEnd,
    alreadyBold: false,
  };

  /**
   * we are subtracting and adding 2 to the actual selection
   * start and end point because inside markdown bold will be
   * **bolded text** so the two star in the front and 2 star in the back
   **/
  const startPoint = selectionStart - 2;
  const endPoint = selectionEnd + 2;
  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  if (selectedText.startsWith("**") && selectedText.endsWith("**")) {
    /**
     * ^ start
     * \ scape * because * is a special char in RegX
     * +$ match end as wll
     * g match all don't return on first match
     * m multi line (not only start and end of a string)
     *
     **/

    result.value = selectedText.replace(/(^\*\*+|\*\*+$)/gm, "");
    result.alreadyBold = true;
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
  }

  return result;
};

const isAlreadyBlockQuote = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonQuotedValue: "",
    selectionStart,
    selectionEnd,
    alreadyBlockQuote: false,
  };

  // because (> ) this syntax is for block quote and we have to count those the length of those two character as well
  const startPoint = selectionStart - 2;
  const endPoint = selectionEnd;

  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  if (selectedText.startsWith("> ")) {
    /**
     * This regX with replace > from beginning
     **/

    result.nonQuotedValue = selectedText.replace(/(^> )/gm, "");
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyBlockQuote = true;
  }

  return result;
};

const isAlreadyUL = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonULValue: "",
    selectionStart,
    selectionEnd,
    alreadyUL: false,
  };

  // because (- ) this syntax is for ordered list and we have to count the length of those two characters as well
  const startPoint = selectionStart - 2;
  const endPoint = selectionEnd;

  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  if (selectedText.startsWith("- ")) {
    /**
     * This regX with replace - from beginning
     **/

    result.nonULValue = selectedText.replace(/(^- )/gm, "");
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyUL = true;
  }

  return result;
};

const isAlreadyOL = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;
  type result = {
    nonOLValue: string;
    list: string[];
    selectionStart: number;
    selectionEnd: number;
    alreadyOL: boolean;
    previousSelectionLength: number;
  };

  const result: result = {
    nonOLValue: "",
    list: [],
    selectionStart,
    selectionEnd,
    alreadyOL: false,
    previousSelectionLength: 0,
  };

  // // because (- ) this syntax is for ordered list and we have to count the length of those two characters as well
  // const startPoint = selectionStart - 3;
  // const endPoint = selectionEnd;

  // const selectedText = Selection.selectedText(value, startPoint, endPoint);

  const selectedText = Selection.selectedText(
    value,
    selectionStart,
    selectionEnd
  );
  const list = selectedText.split("\n");
  const startWithDigit = /\d+\. /gm;
  let unListedText = "";

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (startWithDigit.test(item)) {
      // if last item then don't add /n
      if (i === list.length - 1)
        unListedText += item.replace(startWithDigit, "");
      else unListedText += item.replace(startWithDigit, "") + "\n";
    }
  }

  // if there is unlisted text it means this was previously list items
  if (unListedText) {
    result.nonOLValue = unListedText;
    result.selectionStart = selectionStart;
    result.selectionEnd = selectionEnd;
    result.alreadyOL = true;
    result.previousSelectionLength = selectedText.length;
  } else {
    result.list = list;
    result.selectionStart = selectionStart;
    result.selectionEnd = selectionEnd;
    result.alreadyOL = false;
  }

  return result;
};

const isAlreadyHeader = (editor: editor, headerStyle: number) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonHeaderValue: "",
    selectionStart,
    selectionEnd,
    alreadyHeader: false,
  };

  // because (# | ## or ### ) these are the syntax is for header and we have to count the length of those characters as well
  const startPoint = selectionStart - headerStyle - 1; // 1 is for space
  const endPoint = selectionEnd;

  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  const headerSymbol = getHeaderStyleSymbols(headerStyle);
  if (selectedText.startsWith(headerSymbol)) {
    /**
     * This regX with replace all # from beginning
     **/

    result.nonHeaderValue = selectedText.replace(/(^#* )/gm, "");
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyHeader = true;
  }

  return result;
};

const isAlreadyItalic = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonItalicValue: "",
    selectionStart,
    selectionEnd,
    alreadyItalic: false,
  };

  const startPoint = selectionStart - 1;
  const endPoint = selectionEnd + 1;

  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  if (selectedText.startsWith("_") && selectedText.endsWith("_")) {
    /**
     * This regX with replace _ from beginning and end with empty string
     **/

    result.nonItalicValue = selectedText.replace(/(^_+|_+$)/gm, "");
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyItalic = true;
  }

  return result;
};

const isAlreadyInlineCode = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonInlineCode: "",
    selectionStart,
    selectionEnd,
    alreadyInline: false,
  };

  const startPoint = selectionStart - 1;
  const endPoint = selectionEnd + 1;

  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  if (selectedText.startsWith("`") && selectedText.endsWith("`")) {
    /**
     * This regX with replace backTick from beginning and end with empty string
     **/

    result.nonInlineCode = selectedText.replace(/(^`+|`+$)/gm, "");
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyInline = true;
  }

  return result;
};

const isAlreadyBlockCode = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonBlockCode: "",
    selectionStart,
    selectionEnd,
    alreadyBlockCode: false,
  };

  const startPoint = selectionStart - 3;
  const endPoint = selectionEnd + 3;

  const selectedText = Selection.selectedText(value, startPoint, endPoint);

  if (selectedText.startsWith("```") && selectedText.endsWith("```")) {
    /**
     * This regX with replace 3 backTicks from beginning and end with empty string
     **/

    result.nonBlockCode = selectedText.replace(/(^```+|```+$)/gm, "");
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyBlockCode = true;
  }

  return result;
};

const isAlreadyLinked = (editor: editor) => {
  const { value, selectionStart, selectionEnd } = editor;

  const result = {
    nonLinkedText: "",
    selectionStart,
    selectionEnd,
    alreadyLinked: false,
  };

  const startPoint = selectionStart - 1;
  let endPoint = selectionEnd + 2;

  let selectedText = Selection.selectedText(value, startPoint, endPoint);

  const linkRegex = /(\[).*(\])|[(].*[)]/gm;
  if (linkRegex.test(selectedText)) {
    // This loop will find the closing parentheses of selected link text and updates the endpoint
    while (!selectedText.endsWith(")")) {
      selectedText = Selection.selectedText(value, startPoint, endPoint);
      endPoint++;
    }

    const matchedTextList = selectedText.match(/\[(.*?)\]/);
    if (matchedTextList?.length) {
      result.nonLinkedText = matchedTextList[1];
    }
    result.selectionStart = startPoint;
    result.selectionEnd = endPoint;
    result.alreadyLinked = true;
  }

  return result;
};

// insert youtube link
export const insertYoutubeLink = (editor: editor, url: string) => {
  if (!url) return;
  const linkArray = url.split("watch?v=");
  const youtubeUrl = linkArray[0].includes("youtube.com");
  const youtubeId = linkArray[1];
  if (!youtubeUrl || !youtubeId.trim()) return;

  const { value, selectionStart, selectionEnd } = editor;
  const { beforeSelection, afterSelection } = Selection.beforeAndAfter(
    value,
    selectionStart,
    selectionEnd
  );

  const youtubeLink = `\n<YouTube id='${youtubeId}' />\n`;

  const finalContent = beforeSelection + youtubeLink + afterSelection;
  editor.value = finalContent;

  editor.focus();

  return finalContent;
};

const Selection = {
  selectedText: (
    value: string,
    selectionStart: number,
    selectionEnd: number
  ) => {
    const selectedText = value.substring(selectionStart, selectionEnd);

    return selectedText;
  },
  beforeAndAfter: (
    value: string,
    selectionStart: number,
    selectionEnd: number
  ) => {
    const beforeSelection = value.substring(0, selectionStart);
    const afterSelection = value.substring(selectionEnd);

    return { beforeSelection, afterSelection };
  },
  updateSelection: (
    editor: editor,
    selectionStart: number,
    selectionEnd: number
  ) => {
    editor.selectionStart = selectionStart;
    editor.selectionEnd = selectionEnd;
    editor.setSelectionRange(selectionStart, selectionEnd);
    editor.focus();
  },
};

let lastHistorySaved: number = 0;
export const saveHistory = (
  history: string[],
  newContent: string = ""
): string[] => {
  const now = Date.now();
  let modifiedHistory = history;
  if (now - lastHistorySaved < 300) return history;

  // removing the first history if we have more then 20.
  if (history.length === 20) modifiedHistory = history.slice(1);

  lastHistorySaved = Date.now();
  return modifiedHistory.concat(newContent);
};

let previousCursor = 0;
let alreadyReachedToLimit = false;
export const undoHistory = (history: string[]): string => {
  const historyLength = history.length;
  // if we are starting for the first time. Otherwise it will go to the loop when we reset the cursor.
  if (!previousCursor && !alreadyReachedToLimit)
    previousCursor = historyLength - 1;
  const newHistory = history[previousCursor];
  if (previousCursor > 0) {
    previousCursor--;
    alreadyReachedToLimit = true;
  }

  return newHistory;
};

export const redoHistory = (history: string[]): string => {
  const historyLength = history.length;
  if (!previousCursor) previousCursor = 1;
  const newHistory = history[previousCursor];
  if (previousCursor < historyLength - 1) previousCursor++;
  return newHistory;
};
