export const getHeaderStyleSymbols = (headerStyle: number) => {
  let symbol = "";
  for (let i = 0; i < headerStyle; i++) {
    symbol += "#";
  }

  return symbol + " ";
};

export default {
  bold: (value: string) => `**${value}**`,
  italic: (value: string) => `_${value}_`,
  link: (value: string) => `[${value}]()`,
  quote: (value: string) => `> ${value}`,
  inlineCode: (value: string) => "`" + value + "`",
  codeBlock: (value: string) => "```" + value + "```",
  unOrderedList: (value: string) => `- ${value}`,
  orderedList: (list: string[]) => {
    let listItems = "";

    for (let i = 0; i < list.length; i++) {
      // if we are at the end don't add \n
      if (i === list.length - 1) listItems += `${i + 1}. ${list[i]}`;
      else listItems += `${i + 1}. ${list[i]}\n`;
    }
    return listItems;
  },
  header: (value: string, headerStyle: number) => {
    return getHeaderStyleSymbols(headerStyle) + value;
  },
};
