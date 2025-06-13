import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { IconsPicAvatar } from "../../@core/components/common";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { DashboardCard } from "./DashboardCard";
import welcomePic from "../../@core/assets/photos/welcome.png";
import { useState } from "react";
import StatsWithLineChart from "../../@core/components/widgets/stats/StatsWithLineChart";
import ActivityCard from "./ActivityCard";
import AccordingToTheComment from "./AccordingToTheComment";
import CourseBasedOnStatus from "./CourseBasedOnStatus";
import CategorizingUsersByRole from "./CategorizingUsersByRole";
import DashboardTop from "./DashboardTop";
import { useDispatch } from "react-redux";
import { adminInfoSlice } from "./store/adminInfoSlice";
import { useGetItem } from "../../utility/hooks/useLocalStorage";
import {
  getCourseListData,
  getCourseReservData,
  getReportData,
  getTeacherList,
  getTechnologiReport,
  getUserCommentByAdmin,
  getUserInfoData,
  getUserListData,
  getUserProfileInfo,
} from "../../@core/services/api";
import {
  addCourseListData,
  addCourseReservListData,
  addCourseReservTotalCount,
  addCurseListTotalCount,
  addDataTheAdminInfoState,
  addTeacherListData,
  addTheacherTotalCount,
} from "./store/actions";
import {
  addCommnetManagementData,
  addCommnetManagementTotalCount,
} from "../partialSlice/actions";
import { addUserListTotalCount } from "../user/list/users/store/actions";
import CardMedal from "./list/CardModel";
import SupportTracker from "./list/SupportTracker";
import UserActiveCard from "./list/UserActiveCard";
import Earnings from "./list/Earnings";
import StatsCard from "./list/StatusCard";

const TowCard = ({ title, desc }) => {
  return (
    <Card className="m-0 p-0">
      {/* <Col>
        <div className="right">
          <label className="text-22">{title}</label>
          <p className="text-22">{desc}</p>
        </div>
        <div className="left"></div>
      </Col>
      <Col> */}
      <StatsWithLineChart
        //    icon={<item.icon size={21} />}
        color={"primery"}
        stats={"4"}
        statTitle={"محصولات"}
        series={[{ name: "m", data: ["150", "200", "125", "225", "200"] }]}
        type="line"
        className="m-0 p-0"
      />
      {/* </Col> */}
    </Card>
  );
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  // const [activatyData, setActivatyData] = useState([
  //   {
  //     title: "درصد تکمیل پروفایل کاربران (بالای 70 درصد)",
  //     percentageNumber: 15,
  //     bottomText: ["تعداد بالای 70 درصد", "تعداد زیر 70 درصد"],
  //   },
  //   {
  //     title: "درصد دوره های فعال",
  //     percentageNumber: 70,
  //     bottomText: ["تعداد فعال", "تعداد غیر فعال"],
  //   },
  // ]);

  // const statusData = [
  //   { title: "4", desc: "محصولات", num: "" },
  //   { title: "4", desc: "محصولات", num: "" },
  //   { title: "4", desc: "محصولات", num: "" },
  // ];

  // const userId = useGetItem("id");
  // console.log(userId);
  // const { data: userInfoData, isLoading } = getUserInfoData(
  //   "userInfoData",
  //   `/User/UserDetails/`,
  //   userId
  // );

  // if (!isLoading) {
  //   console.log("userInfoData ==>", userInfoData);
  //   dispatch(addDataTheAdminInfoState(userInfoData));
  // }

  // // get comment data
  // const { data: commentData, isLoading: commentDataGetLoading } =
  //   getUserCommentByAdmin("userComment", "/Course/CommentManagment");
  // if (!commentDataGetLoading) {
  //   console.log("commentData ==>", commentData);
  //   dispatch(addCommnetManagementData(commentData.comments));
  //   dispatch(addCommnetManagementTotalCount(commentData.totalCount));
  // }

  // const { data: teacherData, isLoading: getTeacherLoading } = getTeacherList(
  //   "theacherListData",
  //   "/Home/GetTeachers"
  // );

  // if (!getTeacherLoading) {
  //   console.log(teacherData);
  //   dispatch(addTeacherListData(teacherData));
  //   dispatch(addTheacherTotalCount(teacherData.length));
  // }

  // // get course reserv list
  // const { data: courseReservData, isLoading: courseReservLoading } =
  //   getCourseReservData("courseReservList", "/CourseReserve");
  // if (!courseReservLoading) {
  //   console.log("courseReservData ==>", courseReservData);
  //   dispatch(addCourseReservListData(courseReservData));
  //   dispatch(addCourseReservTotalCount(courseReservData.length));
  // }

  // // get user list data
  // const { data: userListData, isLoading: getUserListLoading } = getUserListData(
  //   "userListData",
  //   "/User/UserMannage"
  // );
  // if (!getUserListLoading) {
  //   console.log("userListData ==>", userListData);
  //   dispatch(addUserListTotalCount(userListData.totalCount));
  // }

  // // get cours list data
  // const { data: courseListData, isLoading: getCourseListLoading } =
  //   getCourseListData("courseListData", "/Course/CourseList");
  // if (!getCourseListLoading) {
  //   console.log("courseListData ==>", courseListData);
  //   dispatch(addCurseListTotalCount(courseListData.totalCount));
  // }

  const { data: reportData, isLoading: getReportDataLoading } = getReportData(
    "getReportData",
    "/Report/DashboardReport"
  );
  if (!getReportDataLoading) {
    console.log("reportData ==>", reportData);
  }

  const { data: userInfoData, isLoading: getUserInfoDataLoading } =
    getUserProfileInfo("userInfoData", "/SharePanel/GetProfileInfo");
  if (!getUserInfoDataLoading) {
    console.log("userInfoData ==>", userInfoData);
  }

  const {
    data: technologiReportData,
    isLoading: getTechnologiReportDataLoading,
  } = getTechnologiReport(
    "getTechnologiReport",
    "/Report/DashboardTechnologyReport"
  );

  if (!getTechnologiReportDataLoading) {
    console.log("technologiReportData ==>", technologiReportData);
  }

  return (
    // <div className="dashboard-control">
    //   <DashboardTop />
    //   <div
    //     className="center-item-control w-100 mt-1"
    //     // style={{ display: "flex", justifyContent: "space-around" }}
    //   >
    //     <Col
    //       className="w-100 p-0 m-0"
    //       style={{ display: "flex", justifyContent: "space-between" }}
    //     >
    //       {statusData.map((item, index) => {
    //         return (
    //           <Row style={{ width: "32%" }} className="m-0 p-0">
    //             <TowCard title={item.title} desc={item.desc} />
    //           </Row>
    //         );
    //       })}
    //     </Col>
    //     <Col
    //       style={{ display: "flex", justifyContent: "space-between" }}
    //       className="mt-1"
    //     >
    //       {activatyData.map((item, index) => {
    //         return (
    //           <ActivityCard
    //             // style={{}}
    //             key={index}
    //             title={item.title}
    //             percentageNumber={item.percentageNumber}
    //             bText1={item.bottomText[0]}
    //             bText2={item.bottomText[1]}
    //           />
    //         );
    //       })}
    //       <AccordingToTheComment />
    //     </Col>
    //   </div>
    //   {/* <div
    //     className="bottom-item-control"
    //     style={{ display: "flex", justifyContent: "space-between" }}
    //   > */}
    //     <Col
    //       className="bottom-item-control"
    //       style={{ display: "flex", justifyContent: "space-between" }}
    //     >
    //     {/* <Row style={{ width: "45%", height: "400px" }}> */}
    //       <CourseBasedOnStatus />
    //     {/* </Row> */}
    //     {/* <Row style={{ width: "45%", height: "400px" }}> */}
    //       <CategorizingUsersByRole />
    //     {/* </Row> */}
    //     </Col>
    //   {/* </div> */}
    // </div>
    <>
      <Row style={{ minHeight: "279px", marginTop: "10px" }}>
        <Col md="4" className="h-100">
          <CardMedal
            userName={userInfoData?.fName}
            paymentCost={reportData?.allPaymentCost}
          />
        </Col>
        <Col md="8" style={{ display: "flex", gap: "15px" }}>
          <div className="h-100" style={{ width: "290px" }}>
            {/* <SupportTracker /> */}
            <UserActiveCard
              title={"تعداد کل کاربران"}
              counter={reportData?.allUser}
            />
          </div>
          <div className="h-100" style={{ width: "290px" }}>
            <UserActiveCard
              title={" تعداد کاربران (براساس تکمیل پروفایل)  "}
              counter={reportData?.inCompeletUserCount}
            />
          </div>
          <div className="h-100" style={{ width: "290px" }}>
            <UserActiveCard
              title={" تعداد کاربران غیر فعال "}
              counter={reportData?.deactiveUsers}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Earnings
            number={reportData ? Math.round(reportData.activeUserPercent) : 0}
          />
        </Col>
        <Col>
          <StatsCard
            cols={{ xl: "3", sm: "6" }}
            number={{
              reserved: reportData?.allReserve,
              rejected: reportData?.allReserveNotAccept,
              accepted: reportData?.allReserveAccept,
            }}
          />
        </Col>
      </Row>
    </>
  );
};
