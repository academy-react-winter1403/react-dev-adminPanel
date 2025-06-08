import { http } from "../../../@core/services/interceptor";

export const filterDataCourse = async ({
  PageNumber,
  RowsOfPage,
  Query,
  IsActive,
}) => {
  const response = await http.get("/Course/CourseList", {
    params: {
      PageNumber,
      RowsOfPage,
      Query,
    },
  });
  console.log(response.courseDtos)
  console.log(response.totalCount)
  return{
    data: response.courseDtos,
    totalCount: response.totalCount
  }
};
