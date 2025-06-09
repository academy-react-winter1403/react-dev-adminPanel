import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { useSelector } from "react-redux";

const TermReport = () => {
  const state = useSelector((state) => state);
  const { termListSlice, departmentSlice } = state;
  const { termList } = termListSlice;
  const [termAccept, setTermAccept] = useState(null);
  const [termRejected, setTermRejected] = useState(null);
  const userReport = [
    {
      title: "کل ترم ها",
      color: "primary",
      stats: termList ? termList.length : "",
      icon: User,
    },
    {
      title: "ترم های منقضی شده",
      color: "danger",
      stats: termAccept ? termAccept.length : "",
      icon: UserPlus,
    },
    {
      title: "ترم های منقضی نشده",
      color: "success",
      stats: termRejected ? termRejected.length : "",
      icon: UserCheck,
    },
  ];

  console.log("termList ==>", termList);

  const filterData = () => {
    const termAccept = termList.filter((el) => el.expire === true);
    const termRejected = termList.filter((el) => el.expire === false);
    setTermAccept(termAccept);
    setTermRejected(termRejected);
  };

  useEffect(() => {
    if (termList) {
      filterData();
    }
  }, [termList]);

  return userReport.map((item, index) => (
    <Col key={index} md="3">
      <StatsHorizontal
        color={item.color}
        statTitle={item.title}
        icon={<item.icon size={20} />}
        renderStats={<h3 className="fw-bolder mb-75">{item.stats}</h3>}
      />
    </Col>
  ));
};

export default TermReport;
