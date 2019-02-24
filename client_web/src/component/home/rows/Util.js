export const getLength = (list, maxLength) => {
  let length;
  if (list.length >= maxLength) {
    length = maxLength;
  } else {
    length = list.length;
  }
  return length;
};
