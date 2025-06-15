import { Col, Row } from "reactstrap";
import UserInfoCard from "./../../../@core/components/common/UserInfoCard/UserInfoCard";
import UserTabs from "./../../../@core/components/common/Tabs/UserTabs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, usePutData } from "../../../@core/services/api";
import ChildrenModalCourse from "./ChildrenModalCourse";
import ChildrenModalCourseData from "./ChildrenModalCourseData";
import ChildrenModalCourseTotal from "./ChildrenModalCourseTotal";

const CourseDetails = () => {
  const headers = ["عنوان", "تاریخ", "امتیاز", "وضعیت"];
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const [titleDetails, setTitleDetails] = useState(null);
  const [avatarImg, setAvatarImg] = useState(null);
  const [Primary, setPrimary] = useState(null);
  const [filedPreview, setFiledPreview] = useState([]);
  const [filedDetails, setFiledDetails] = useState([]);
  const [listComments, setListComments] = useState([]);

  const { CourseId } = useParams();
  // console.log(CourseId);
  const { data, isLoading } = getData("CourseDetails", `/Course/${CourseId}`);
  useEffect(() => {
    if (!isLoading && data) {
      console.log("it is data", data);
      setTitleDetails(data.title);
      setPrimary(data.isActive);
      setAvatarImg(data.imageAddress);
      const previewData = [
        {
          title: "تعداد خریداری ",
          describe: data.paymentDoneTotal ?? "نامشخص",
        },
        {
          title: "تعداد رزور ها",
          describe: data.reserveUserTotal ?? "نامشخص",
        },
        {
          title: "قیمت دوره",
          describe: data.cost + " " + "ریال" ?? "نامشخص",
        },
        {
          title: "تعداد کامنت ها",
          describe: data.courseCommentTotal ?? "نامشخص",
        },
        {
          title: "نوع شرکت در کلاس",
          describe: data.courseTypeName ?? "نامشخص",
        },
        {
          title: "تاریخ شروع دوره",
          describe: data.startTime ?? "نامشخص",
        },
        {
          title: "اسم استاد",
          describe: data.teacherName ?? "نامشخص",
        },
        {
          title: "تاریخ پایان دوره",
          describe: data.endTime ?? "نامشخص",
        },
      ];
      setFiledPreview(previewData);
      const DetailsData = [
        {
          title: "عنوان دوره",
          describe: data.title ?? "نامشخص",
        },
        {
          title: "نوع شرکت در کلاس",
          describe: (
            <div className="gap-1 d-flex flex-wrap justify-content-start mt-1">
              {data.courseSocialGroupDtos.map((item) => {
                return (
                  <p className="text-capitalize cursor-pointer badge bg-light-primary">
                    {item.groupName}
                  </p>
                );
              }) ?? "نامشخص"}
            </div>
          ),
        },
        {
          title: "برنامه کلاس",
          describe: data.courseLevelName ?? "نامشخص",
        },
        {
          title: "مباحث تدریس شده",
          describe: (
            <div className="gap-1 d-flex flex-wrap justify-content-start mt-1">
              {data.courseTeches.map((item) => {
                return (
                  <p className="text-capitalize cursor-pointer badge bg-light-primary">
                    {item}
                  </p>
                );
              }) ?? "نامشخص"}
            </div>
          ),
        },
        {
          title: "توضیحات",
          describe: data.describe ?? "نامشخص",
        },
      ];
      setFiledDetails(DetailsData);
    }
  }, [isLoading, data]);
  const { mutate: putDataMutate } = usePutData("postAllData");
  const handleSwitchChange = async (newValue) => {
    setPrimary(newValue);
    const dataObj = {
      active: newValue,
      id: CourseId,
    };
    console.log(dataObj);
    putDataMutate(["/Course/ActiveAndDeactiveCourse", dataObj], {
      onSuccess: (data) => {
        console.log("Success:", data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };
  return (
    <Row>
      <Col md={4} className="mt-5">
        <UserInfoCard
          TitleDetails={titleDetails}
          avatarImg={avatarImg}
          Primary={Primary}
          checked={handleSwitchChange}
          title={"ادیت دوره"}
          children={<ChildrenModalCourse />}
          Modals={false}
          titleData={"تغییر وضعیت"}
          childrenData={<ChildrenModalCourseData />}
          titleTotal={"افزودن کتگوری"}
          childrenTotal={<ChildrenModalCourseTotal />}
        />
      </Col>
      <Col md={8}>
        <Row>
          <UserTabs
            course={true}
            active={active}
            toggleTab={toggleTab}
            filedPreview={filedPreview}
            filedDetails={filedDetails}
            // dataMap={dataWithRatio}
            fieldKeys={["inserDate", "likeRatio"]}
            headers={headers}
            titleField="title"
            // Btn={}
          />
        </Row>
      </Col>
    </Row>
  );
};
export default CourseDetails;
