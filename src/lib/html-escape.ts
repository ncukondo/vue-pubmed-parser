export { escapeHtml, removeTag };

const START_ESCAPE = 'AAAAAAAAAAAAAAA';
const END_ESCAPE = 'BBBBBBBBBBBBBBBBB';
const SLASH_ESCAPE = 'CCCCCCCCCCCCCCC';
const QUOTE_ESCAPE = 'DDDDDDDDDDDDDDDDDDD';
const SQUOTE_ESCAPE = 'EEEEEEEEEEEEEEEEEEEEEE';

const BEGIN_TAG_PATTERN1 = /\<([a-zA-Z]+) (.*?)\>/g;
const BEGIN_TAG_PATTERN2 = /\<([a-zA-Z]+)\>/g;
const END_TAG_PATTERN = /\<\/([a-zA-Z]+)\>/g;

const processBeginTagFunc = (allowTags: string[]) => {
  return (substring: string, ...args: string[]) => {
    const tag = args[0];
    let attr = args.length > 3 ? args[1] : '';
    let result = substring;
    if (allowTags.includes(tag.toLowerCase())) {
      result = START_ESCAPE + tag + END_ESCAPE;
      if (attr) {
        attr = attr
          .replace(new RegExp('"', 'g'), QUOTE_ESCAPE)
          .replace(new RegExp('\'', 'g'), SQUOTE_ESCAPE)
          .replace(new RegExp('/', 'g'), SLASH_ESCAPE);
        result = START_ESCAPE + tag + ' ' + attr + END_ESCAPE;
      }
    }
    return result;
  };
};

const processEndTagFunc = (allowTags: string[]) => {
  return (substring: string, ...args: string[]) => {
    const tag = args[0];
    let result = substring;
    if (allowTags.includes(tag.toLowerCase())) {
      result = START_ESCAPE + SLASH_ESCAPE + tag + END_ESCAPE;
    }
    return result;
  };
};

const removeTag = (str: string, allowTags: string[] = []): string => {
  if (allowTags) {
    str = str
      .replace(BEGIN_TAG_PATTERN1, processBeginTagFunc(allowTags))
      .replace(BEGIN_TAG_PATTERN2, processBeginTagFunc(allowTags))
      .replace(END_TAG_PATTERN, processEndTagFunc(allowTags));
  }
  str = str
    .replace(BEGIN_TAG_PATTERN1, '')
    .replace(BEGIN_TAG_PATTERN2, '')
    .replace(END_TAG_PATTERN, '');
  str = escapeChars(str);
  if (allowTags) {
    str = restoreEscapeChars(str);
  }
  return str;
};

const escapeChars = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;');
};

const restoreEscapeChars = (text: string): string => {
  return text
    .replace(new RegExp(START_ESCAPE, 'g'), '<')
    .replace(new RegExp(END_ESCAPE, 'g'), '>')
    .replace(new RegExp(SLASH_ESCAPE, 'g'), '/')
    .replace(new RegExp(QUOTE_ESCAPE, 'g'), '"')
    .replace(new RegExp(SQUOTE_ESCAPE, 'g'), '\'');
};

const escapeHtml = (str: string, allowTags: string[] = []): string => {
  if (allowTags) {
    str = str
      .replace(BEGIN_TAG_PATTERN1, processBeginTagFunc(allowTags))
      .replace(BEGIN_TAG_PATTERN2, processBeginTagFunc(allowTags))
      .replace(END_TAG_PATTERN, processEndTagFunc(allowTags));
  }
  str = escapeChars(str);
  if (allowTags) {
    str = restoreEscapeChars(str);
  }
  return str;
};
