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
