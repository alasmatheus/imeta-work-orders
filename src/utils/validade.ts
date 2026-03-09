import moment from "moment";

export const formatDate = (date: any) => {
  const parsedDate = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = parsedDate.format("DD/MM/YYYY [às] HH:mm");
  return formattedDate;
};
