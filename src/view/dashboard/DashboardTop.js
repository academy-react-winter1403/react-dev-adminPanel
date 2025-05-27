import { Card, Col } from "reactstrap";
import { DashboardCard } from "./DashboardCard";
import { User, UserPlus, UserCheck, UserX, X, Cast } from "react-feather";
import welcomePic from "../../@core/assets/photos/welcome.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const DashboardTop = () => {
  const state = useSelector((state) => state);
  const {
    adminInfoSlice,
    commentManagementSlice,
    teacherListSlice,
    courseReservListSlice,
    userListSlice,
    courseListSlice
  } = useSelector((state) => state);
  const { adminInfoState } = adminInfoSlice;
  const { totalCount } = commentManagementSlice;
  const { theacherTotalCount } = teacherListSlice;
  const { courseReservListData } = courseReservListSlice;
  const { userListTotalCount } = userListSlice
  const { courseListTotalCount } = courseListSlice
  const [data, setData] = useState(null);

  console.log(state);

  // course reserv filtered
  const [courseAccept, setCourseAccept] = useState(null);
  const [courseNoAccept, setCourseNoAccept] = useState(null);

  const courseReservFiltered = () => {
    if (courseReservListData) {
      const filteredAccept = courseReservListData.filter(
        (el) => el.accept === true
      );
      setCourseAccept(filteredAccept);

      const filteredNoAccept = courseReservListData.filter(
        (el) => el.accept === false
      );
      setCourseNoAccept(filteredNoAccept);
    }
  };

  useEffect(() => {
    courseReservFiltered();
  }, [courseReservListData]);

  console.log(adminInfoState);

  const leftItemData = [
    {
      title: "کامنت ها",
      num: totalCount ? totalCount : "",
      icon: User,
      color: "danger",
    },
    {
      title: "اساتید",
      icon: User,
      num: theacherTotalCount ? theacherTotalCount : "",
      color: "danger",
    },
    {
      title: "رزروهای تایید شده",
      icon: User,
      num: courseAccept ? courseAccept.length : "",
      color: "warning",
    },
    {
      title: "رزروهای تایید نشده",
      icon: X,
      num: courseNoAccept ? courseNoAccept.length : "",
      color: "warning",
    },
  ];

  const centerItemData = [
    { title: "کاربران", icon: User, num: userListTotalCount ? userListTotalCount : "", color: "danger" },
    { title: "دوره ها", icon: Cast, num: courseListTotalCount ? courseListTotalCount : "", color: "danger" },
    { title: " پروفایل تکمیل شده ", icon: User, num: "", color: "warning" },
    { title: " کاربران غیرفعال ", icon: X, num: "", color: "warning" },
  ];

  return (
    <div className="top-item-control flex-1">
      <div className="right right-flex">
        <div
          className="welcome-card"
          style={{ backgroundImage: `url(${welcomePic})` }}
        >
          <Col className="w-100 text-absolte-control bottom-1">
            <label className="text-absolte w-50 text-22">{`${
              adminInfoState?.fName ? adminInfoState.fName : ""
            } عزیز تبریک میگم `}</label>
          </Col>
          <Col className="w-100 text-absolte-control bottom-2">
            <label>{`مبلغ تمام پرداختی دوره های تیم نامبر وان به ${
              data?.price ? data.price : "20,000,000"
            } تومان رسید`}</label>
          </Col>
        </div>
        <Card className="p-3 pt-1 m-0">
          <div className="top-control">
            <label> درصد کاربران فعال </label>
          </div>
          <div
            className="bottom-control"
            style={{ position: "relative", top: "10px" }}
          >
            <label>{`%${data?.darsad} درصد از کاربران در یک هفته گذشته فعال بودند `}</label>
          </div>
        </Card>
      </div>
      <div className="center dashboard-card-holder">
        {centerItemData.map((item, index) => {
          return (
            <DashboardCard
              color={item.color}
              title={item.num}
              desc={item.title}
              key={index}
              item={item}
            />
          );
        })}
      </div>
      <div className="left dashboard-card-holder">
        {leftItemData.map((item, index) => {
          return (
            <DashboardCard
              color={item.color}
              title={item.num}
              desc={item.title}
              key={index}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTop;
