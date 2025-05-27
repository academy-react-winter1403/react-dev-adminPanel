import { http } from "../../../@core/services/interceptor";

export const filterDataNews = async ({
  PageNumber,
  RowsOfPage,
  Query,
  IsActive,
}) => {
  const response = await http.get("/News/AdminNewsFilterList", {
    params: {
      PageNumber,
      RowsOfPage,
      Query,
      IsActive,
    },
  });
  console.log(response.news)
  console.log(response.totalCount)
  return{
    data: response.news,
    totalCount: response.totalCount
  }
};
