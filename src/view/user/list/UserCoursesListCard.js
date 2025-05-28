import { Fragment } from "react";
import { Card, CardBody, CardHeader, Row } from "reactstrap";
import HeadLabelComp from "./HeadLabelComp";
import { CoursesRowCard } from "./CoursesRowCard";
import { useSelector } from "react-redux";
import { Eye } from "react-feather";

const UserCoursesListCard = () => {
  const { userInformationSlice } = useSelector((state) => state);
  const { userInfoData } = userInformationSlice;
  // console.log(userInfoData);
  const headerLabelTextArray = [
    "نام دوره",
    "توضیحات دوره",
    "تاریخ آخرین بروزرسانی",
    "اقدام",
  ];

  const eyeIconClickHandler = (item) => {
    // console.log(item);
  };

  return (
    <>
      <div
        className="lable-control"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <label className="divider-text fs-2"> دوره های تایید شده </label>
        <hr
          style={{
            width: "80%",
            height: "1px",
            outline: "none",
            border: "none",
            background: "rgb(66, 66, 66)",
            marginRight: "8px",
          }}
        />
      </div>
      <Card className="overflow-hidden m-0">
        <CardHeader className="m-0 p-0">
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
                gap: "74px",
              }}
            >
              <label>توضیحات دوره</label>
              <label>تاریخ آخرین بروزرسانی</label>
              <label>اقدام</label>
            </th>
          </HeadLabelComp>
        </CardHeader>
        <CardBody
          className={`m-0 p-0 overflow-y-auto ${
            userInfoData && userInfoData.courses.length <= 0 ? "p-2" : null
          }`}
          style={{ maxHeight: "400px" }}
        >
          {userInfoData && userInfoData.courses.length > 0 ? (
            userInfoData?.courses.map((item, index) => {
              return (
                <CoursesRowCard
                  key={index}
                  userImage={item.tumbImageAddress}
                  courseName={item.title}
                  courseDescription={item.describe}
                  courseLastDate={item.lastUpdate}
                  eyeIconClick={() => eyeIconClickHandler(item)}
                  action={
                    <Eye
                      className="cursor-pointer"
                      size={20}
                      // onClick={eyeIconClick}
                    />
                  }
                />
              );
            })
          ) : (
            <label className="w-100 text-center">دوره ای نیست😒😒😒</label>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default UserCoursesListCard;
