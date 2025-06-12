import React, { useState } from "react";
import TableFilter from "../../../../@core/components/common/Filter/TableFilter";
import { useDispatch } from "react-redux";
import {
  changeAllCourseCommentManagementAccept,
  changeAllCourseCommentManagementSortingCol,
  changeAllCourseCommentManagementSortingType,
} from "../../store/actions";

const FilterSection = () => {
  const dispatch = useDispatch();
  const [commentStatus, setCommentStatus] = useState({
    value: "",
    label: "وضعیت کامنت",
  });
  const [replayNumber, setReplayNumber] = useState({
    value: "",
    label: "براساس",
  });
  const [sortType, setSortType] = useState({
    value: "",
    label: "نوع مرتب سازی",
  });
  const filterData = [
    {
      title: "وضعیت کامنت",
      options: [
        { value: "acceptTrue", label: "تایید شده" },
        { value: "acceptFalse", label: "تایید نشده" },
        { value: "all", label: "همه" },
      ],
      state: commentStatus,
      onChange: (data) => {
        console.log("data ==>", data);
        setCommentStatus(data);
        if (data.value === "acceptTrue") {
          dispatch(changeAllCourseCommentManagementAccept(true));
        } else if (data.value === "acceptFalse") {
          dispatch(changeAllCourseCommentManagementAccept(false));
        } else {
          dispatch(changeAllCourseCommentManagementAccept(null));
        }
      },
    },
    {
      title: "براساس",
      options: [{ value: "replayNumber", label: "تعداد پاسخ" }],
      state: replayNumber,
      onChange: (data) => {
        console.log("data ==>", data);
        setReplayNumber(data);
        dispatch(changeAllCourseCommentManagementSortingType("insertDate"));
      },
    },
    {
      title: "نوع مرتب سازی",
      options: [
        { value: "soodi", label: "صعودی" },
        { value: "nozoli", label: "نوزولی" },
      ],
      state: sortType,
      onChange: (data) => {
        console.log("data ==>", data);
        setSortType(data);
        if (data.value === "soodi") {
          dispatch(changeAllCourseCommentManagementSortingCol("DESC"));
        } else {
          dispatch(changeAllCourseCommentManagementSortingCol("ASC"));
        }
      },
    },
  ];

  return (
    <div>
      <TableFilter data={filterData} sectionTitle={"فیلتر"} />
    </div>
  );
};

export default FilterSection;
