import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Card, CardBody } from "reactstrap";
import { ChevronDown, Eye } from "react-feather";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";

import AvatarPic from "../../../@core/assets/photos/partial/noFoundImage.jpg";

// Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomPagination from "../../../@core/components/common/custome-pagination/CustomePagination";
import { CoursesRowCard } from "../list/CoursesRowCard";
import HeadLabelComp from "../list/HeadLabelComp";

const UserReserveCourse = () => {
  const navigate = useNavigate();

  const { userInformationSlice } = useSelector((state) => state);
  const { userInfoData } = userInformationSlice;

  // const eyeClickHandler = (item) => {
  //   console.log(item);
  // };

  const gotoCourseDetailHandle = (item) => {
    console.log(item)
    navigate(`/user/view/${item.courseId}`)
  }

  return (
    <>
      <div className="divider divider-start">
        <div className="divider-text fs-2">دوره های رزرو شده</div>
      </div>
      <Card>
        <HeadLabelComp>
          <th
            className="w-50"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <label>نام دوره</label>
          </th>
          <th
            className="w-50"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "109px",
            }}
          >
            <label>وضعیت</label>
            <label>تاریخ رزرو دوره</label>
            <label>عملیات</label>
          </th>
        </HeadLabelComp>
        <CardBody
          className={`m-0 p-0 overflow-y-auto ${
            userInfoData && userInfoData.coursesReseves.length <= 0
              ? "p-2"
              : null
          }`}
          style={{ maxHeight: "400px" }}
        >
          {userInfoData && userInfoData.coursesReseves.length > 0 ? (
            userInfoData.coursesReseves.map((item, index) => {
              if (item.accept) {
                // console.log("coursesReseves...", item);
                return (
                  <CoursesRowCard
                    courseName={item.courseName}
                    courseLastDate={item.reserverDate}
                    courseDescription={
                      <Badge
                        className={`badge bg-light-danger`}
                      >
                        رزرو شده
                      </Badge>
                    }
                    action={
                      <Eye
                        className="cursor-pointer"
                        size={20}
                        onClick={() => gotoCourseDetailHandle(item)}
                      />
                    }
                  />
                );
              }
            })
          ) : (
            <label className="w-100 text-center">
              دوره ای رزرو شده نیست😒😒😒
            </label>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default UserReserveCourse;
