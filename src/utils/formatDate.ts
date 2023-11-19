const formatDate = (timestamp: number) => {
  const date = new Date(+timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}월 ${day}일`;
};

export default formatDate;
