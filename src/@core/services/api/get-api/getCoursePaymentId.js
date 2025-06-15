import { useQuery } from "react-query";
import { http } from "../../interceptor";

export const getCoursePaymentIdData = (
  key,
  endUrl,
  params,
  CourseId,
  enabledFlag
) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await http.get(endUrl, {
        params: params,
      });
      let paymentFullData = []
      let dataObj = {}
      const filteredData = response.filter((el) => el.courseId === CourseId);
      console.log("first name...", filteredData)
      const extraData = await Promise.all(
        filteredData.map(async (studentItem) => {
          const responsePaymentData = await http.get(
            "/CoursePayment/UserPayList",
            {
              params: {
                CourseId: studentItem.courseId,
                StudentId: studentItem.studentId,
              },
            }
          );
          responsePaymentData.forEach((item) => {
            dataObj = {...studentItem, paymentId: item.paymentId}
            paymentFullData.push(dataObj)
          })
        })
      );
      return paymentFullData
    },
    enabled: enabledFlag,
    refetchOnReconnect:true
  });
};
