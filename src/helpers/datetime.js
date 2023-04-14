export const getDateInMDY = (dateString) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};
