export const nlToBr = (str: string, addQuotes = false) => (
  str.replace(/\r\n|\r|\n/gi, addQuotes ? '`<br>`' : '<br>')
);
