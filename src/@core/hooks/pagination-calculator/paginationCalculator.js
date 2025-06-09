export const paginationCalculator = (data, pageNumber, rowsOfPage) => {
  const startIndex = pageNumber * rowsOfPage;
  const endIndex = startIndex + rowsOfPage;
  const currentData = data.slice(startIndex, endIndex);
  return currentData;
};
