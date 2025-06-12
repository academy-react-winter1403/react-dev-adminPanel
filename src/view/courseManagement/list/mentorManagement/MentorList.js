import { Card, CardBody, CardHeader, Col, Label } from "reactstrap";
import UserTable from "../../../user/list/UserTable";
import Export from "../../../../@core/components/common/Export/Export";
import { useEffect } from "react";
import { http } from "../../../../@core/services/interceptor";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataToAllCourseAdmin,
  addDataToMentorList,
  addDataToSingelCourseAdmin,
  changeAllCourseAdminPageNumber,
  changeAllCourseAdminQuery,
  changeMentorDataPageNumber,
  changeMentorDataRowsOfPage,
} from "../../store/actions";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../../@core/hooks";
import { useState } from "react";
import { Edit } from "react-feather";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  getAllCourseAdmin,
  getCourseAdminWithId,
  getMentorListData,
  getMentorWithId,
  updateMentor,
} from "../../../../@core/services/api";
import EditeMentorForm from "./EditeMentorForm";
import CoursePageModal from "./CoursePageModal";
import toast from "react-hot-toast";
import MentorPageModal from "./MentorPageModal";

const MentorList = () => {
  const dispatch = useDispatch();
  const { mentorListData, PageNumber, RowsOfPage } = useSelector(
    (state) => state.mentorSliceData
  );
  const { singelCourseAdmin } = useSelector(
    (state) => state.allCourseAdminDataSlice
  );
  const headerData = ["آیدی", "نام منتور", "نام درس", "تاریخ ایجاد", "اقدام"];
  const [fullData, setFullData] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [mentorId, setMentorId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [coursePageNumber, setCoursePageNumber] = useState(1);
  const [courseRowsOfPage, setCourseRowsOfPage] = useState(10);
  const [editeFormIsOpenFlag, setEditeFormIsOpenFlag] = useState(false);
  const [courseModalFlag, setCourseModalFlag] = useState(false);
  const [mentorPageModalFlag, setMentorPageModalFlag] = useState(false);

  // get mentor list data
  const {
    data: mentorListDataGet,
    isLoading,
    refetch: getMentorListDataRefetch,
  } = getMentorListData("getMentorListData", "/CourseAssistance");

  if (!isLoading) {
    console.log("mentor data ==>", mentorListDataGet);
    dispatch(addDataToMentorList(mentorListDataGet));
  }

  const changePaginationAndMoment = () => {
    const momentCalc = addedDataToObject(mentorListData, (item) => {
      const inserDate = ChangeMoment(item.inserDate, "YYYY/MM/DD", "persian");
      const newObject = { ...item, inserDate };
      return newObject;
    });
    const paginationData = paginationCalculator(
      momentCalc,
      PageNumber,
      RowsOfPage
    );
    setFullData(paginationData);
    setSearchData(paginationData);
  };

  useEffect(() => {
    if (mentorListData) {
      console.log("mentorListData ==>", mentorListData);
      changePaginationAndMoment();
    }
  }, [mentorListData, PageNumber, RowsOfPage]);

  const searchHadnler = (searchValue) => {
    const filteredData = searchData.filter(
      (item) => item.courseName.indexOf(searchValue) !== -1
    );
    setFullData(filteredData);
  };

  const {
    data: mentorSingelData,
    isLoading: mentorSingelDataLoading,
    refetch: mentorSingelDataRefetch,
  } = getMentorWithId(
    "getMentorWithId",
    `/CourseAssistance/${mentorId}`,
    mentorId ? true : false
  );

  useEffect(() => {
    if (mentorId) {
      mentorSingelDataRefetch();
    }
  }, [mentorId]);

  if (!mentorSingelDataLoading) {
    console.log("mentorSingelData ==>", mentorSingelData);
  }

  const btnClickHadnler = (item) => {
    console.log("item ==>", item);
    setMentorId(item.id);
    setCourseId(item.courseId);
    setEditeFormIsOpenFlag(!editeFormIsOpenFlag);
  };

  const { mutate: updateMentorMutate } = updateMentor("updateMentor");
  const mentorUpdateHadnler = (values) => {
    console.log("values ==>", values);
    const dataObject = {
      courseId: values.courseId,
      userId: values.userId,
      id: values.id,
    };
    updateMentorMutate(["/CourseAssistance", dataObject], {
      onSuccess: (data) => {
        toast.success(data.message);
        getMentorListDataRefetch()
        setEditeFormIsOpenFlag(!editeFormIsOpenFlag);
      },
    });
  };

  const {
    data: courseSingelData,
    isLoading: courseSingelDataLoading,
    refetch: courseSingelDataRefetch,
  } = getCourseAdminWithId(
    "getCourseAdminWithId",
    `/Course/${courseId}`,
    courseId ? true : false
  );
  useEffect(() => {
    if (courseId) {
      courseSingelDataRefetch();
    }
  }, [courseId]);
  if (!courseSingelDataLoading) {
    console.log("courseSingelData ==>", courseSingelData);
    dispatch(addDataToSingelCourseAdmin(courseSingelData));
  }
  const getSingelCourseDataHandler = (item) => {
    console.log(item);
    setCourseId(item.courseId);
    setCourseModalFlag(!courseModalFlag);
  };

  const getSingelMentorDataHandler = (item) => {
    console.log(item);
    setMentorId(item.id);
    setMentorPageModalFlag(!mentorPageModalFlag);
  };

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <Col md="12">
          <UserTable
            inputOptionClick={(optionValue) =>
              dispatch(changeMentorDataRowsOfPage(optionValue.label))
            }
            changeSearchInput={searchHadnler}
          />
        </Col>
      </CardHeader>
      <CardBody className="bg-transparent">
        {fullData && (
          <Export
            headers={headerData}
            hover={true}
            dataMap={fullData}
            titleField="userId"
            fieldKeys={["assistanceName", "courseName", "inserDate"]}
            Btn={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  position: "relative",
                  right: "-47px",
                  cursor: "pointer",
                }}
              >
                <Edit size={15} />
                <Label>ویرایش</Label>
              </div>
            }
            btnOnClick={btnClickHadnler}
            btnKeys={{ flag: false }}
          />
        )}
        <Col className="mt-2">
          <SeparatedPagination
            totalCount={mentorListData?.length}
            RowsOfPage={RowsOfPage}
            changePageNumber={(pageNumber) =>
              dispatch(changeMentorDataPageNumber(pageNumber))
            }
          />
        </Col>
      </CardBody>
      <EditeMentorForm
        isOpen={editeFormIsOpenFlag}
        toggle={() => setEditeFormIsOpenFlag(!editeFormIsOpenFlag)}
        formData={{
          mentorData: mentorSingelData?.courseAssistanceDto,
          courseData: singelCourseAdmin,
        }}
        formSubmitHandle={mentorUpdateHadnler}
        courseNameInputClick={() => setCourseModalFlag(!courseModalFlag)}
        mentorNameInputClick={() =>
          setMentorPageModalFlag(!mentorPageModalFlag)
        }
      />
      <CoursePageModal
        isOpen={courseModalFlag}
        toggle={() => setCourseModalFlag(!courseModalFlag)}
        btnOnClick={getSingelCourseDataHandler}
      />
      <MentorPageModal
        isOpen={mentorPageModalFlag}
        toggle={() => setMentorPageModalFlag(!mentorPageModalFlag)}
        btnOnClick={getSingelMentorDataHandler}
      />
    </Card>
  );
};

export default MentorList;
