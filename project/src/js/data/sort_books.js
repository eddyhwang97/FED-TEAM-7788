// 신착도서
export const sortByNewest = (books) => {
  return [...books].sort((a, b) => {
    const compare = new Date(b.pDate) - new Date(a.pDate);
    return compare !== 0 ? compare : b.bNum - a.bNum;
  });
};

// 베스트셀러
export const sortByBest = (books) => {
  return [...books].sort((a, b) => b.bNum - a.bNum);
};
