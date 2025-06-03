import React from "react";
import { Col } from "reactstrap";
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

const TermReport = () => {
  const userReport = [
    {
      title: "کل ترم ها",
      color: "primary",
      stats: "userReports.totalCount.totalCount",
      icon: User,
    },
    {
      title: "ترم های منقضی شده",
      color: "danger",
      stats: "userReports.admins.totalCount",
      icon: UserPlus,
    },
    {
      title: "ترم های منقضی نشده",
      color: "success",
      stats: "userReports.teachers.totalCount",
      icon: UserCheck,
    },
  ];

  //   useEffect(() => {
  //     total;
  //     admins;
  //     teachers;
  //     students;
  //   }, []);

  return userReport.map((item, index) => (
    <Col key={index} md="3">
      <StatsHorizontal
        color={item.color}
        statTitle={item.title}
        icon={<item.icon size={20} />}
        // renderStats={<h3 className="fw-bolder mb-75">{item.stats}</h3>}
      />
    </Col>
  ));
};

export default TermReport;
