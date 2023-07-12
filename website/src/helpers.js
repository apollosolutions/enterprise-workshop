import parse from 'html-react-parser';

export const htmlParser = input => parse(input);

export const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
};
