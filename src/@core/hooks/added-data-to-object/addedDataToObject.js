export const addedDataToObject = (data, colbackfunction) => {
  let dataFull = [];
  let dataObj = null;
  data.forEach((elem) => {
    dataObj = colbackfunction(elem);
    dataFull.push(dataObj);
  });
  return dataFull;
};
