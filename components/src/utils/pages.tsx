export const getPageCount = (totalResults: number, limit = 20) => {
  const pageCount = Math.ceil(totalResults / limit);
  return pageCount;
};

export const getPages = (limit = 20, page = 1) => {
  const pages = [];
  switch (limit) {
    case 40: {
      const firstPage = page * 2 - 1;
      pages.push(firstPage, firstPage + 1);
      return pages;
    }
    case 60: {
      const firstPage = page * 3 - 2;
      pages.push(firstPage, firstPage + 1, firstPage + 2);
      return pages;
    }
    default: {
      return;
    }
  }
};

export const pagesArray = (totalPages: number) => {
  const result = [];
  for (let i = 0; i < totalPages!; i += 1) {
    result.push(i + 1);
  }
  return result;
};
