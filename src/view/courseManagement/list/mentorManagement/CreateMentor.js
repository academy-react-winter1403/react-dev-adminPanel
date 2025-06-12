import { useDispatch, useSelector } from "react-redux";
import {
  getAllCourseAdmin,
  getCourseAdminWithId,
  getCourseListData,
  getMentorListData,
} from "../../../../@core/services/api";
import CreateMentorForm from "./CreateMentorForm";
import {
  addDataToAllCourseAdmin,
  addDataToCourseUserList,
  addDataToMentorList,
  addDataToMentorSingel,
  addDataToSingelCourseAdmin,
} from "../../store/actions";
import { useEffect, useState } from "react";
import { Button, Card, Container, Modal, ModalHeader, Row } from "reactstrap";
import UserTable from "../../../user/list/UserTable";
import Export from "../../../../@core/components/common/Export/Export";
import { paginationCalculator } from "../../../../@core/hooks";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import { getMentorDataWithId } from "../../../../@core/services/api/get-api/getMentorDataWithId";
import { createMentor } from "../../../../@core/services/api/post-api/createMentor";
import toast from "react-hot-toast";

const CreateMentor = () => {
  const dispatch = useDispatch();
  const { mentorSliceData, allCourseAdminDataSlice } = useSelector(
    (state) => state
  );
  const { mentorListData, mentorSingelData } = mentorSliceData;
  const { allCourseAminData, singelCourseAdmin } = allCourseAdminDataSlice;
  const [PageNumber, setPageNumber] = useState(0);
  const [RowsOfPage, setRowsOfPage] = useState(6);
  const [coursePageNumber, setCoursePageNumber] = useState(0);
  const [courseRowsOfPage, setCourseRowsOfPage] = useState(6);
  const [fullData, setFullData] = useState([]);
  const [detaKomaki, setDetaKomaki] = useState(null);
  const [boxDataFlag, setBoxDataFlag] = useState(true);
  const [mentorId, setMentorId] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const { mutate: createMentorMutate } = createMentor("createMentor");
  const formSubmitHandle = (values) => {
    console.log(values);
    const dataObject = {
        courseId: values.courseId,
        userId: values.userId
    }
    createMentorMutate(["/CourseAssistance", dataObject], {
        onSuccess: (data) => {
            toast.success(data.message)
        }
    })
  };

  const headerData = ["نام منتور", "ایمیل منتور", "عملیات"];
  const courseHeaderData = ["نام دوره", "وضعیت", "عملیات"];

  let fillDataArray = null;
  const { data: mentorListDataGet, isLoading: mentorListDataLoading } =
    getMentorListData("getMentorListData", "/CourseAssistance");
  if (!mentorListDataLoading) {
    dispatch(addDataToMentorList(mentorListDataGet));
  }

  const {
    data: mentorDataWithId,
    isLoading: mentorDataWithIdLoading,
    refetch: mentorDataWithIdRefetch,
  } = getMentorDataWithId(
    "getMentorDataWithId",
    `/CourseAssistance/${mentorId}`,
    mentorId ? true : false
  );

  if (!mentorDataWithIdLoading) {
    dispatch(addDataToMentorSingel(mentorDataWithId?.courseAssistanceDto));
  }

  useEffect(() => {
    if (mentorId) {
      mentorDataWithIdRefetch();
    }
  }, [mentorId]);

  const {
    data: courseDataWithId,
    isLoading: courseDataWithIdLoading,
    refetch: courseDataWithIdRefetch,
  } = getCourseAdminWithId(
    "getCourseAdminWithId",
    `/Course/${courseId}`,
    courseId ? true : false
  );

  if (!courseDataWithIdLoading) {
    dispatch(addDataToSingelCourseAdmin(courseDataWithId));
  }

  useEffect(() => {
    if (courseId) {
      courseDataWithIdRefetch();
    }
  }, [courseId]);

  const {
    data: courseListDataGet,
    isLoading: courseListDataLoading,
    refetch: courseListDataRefetch,
  } = getAllCourseAdmin("getCourseListData", "/Course/CourseList", {
    PageNumber: coursePageNumber,
    RowsOfPage: courseRowsOfPage,
  });
  if (!courseListDataLoading) {
    dispatch(addDataToAllCourseAdmin(courseListDataGet.courseDtos));
  }
  useEffect(() => {
    courseListDataRefetch();
  }, [coursePageNumber, courseRowsOfPage]);

  const changePagination = () => {
    const paginationData = paginationCalculator(
      mentorListData,
      PageNumber,
      RowsOfPage
    );
    setFullData(paginationData);
  };

  useEffect(() => {
    if (mentorListData && allCourseAminData) {
      changePagination();
    }
  }, [mentorListData, allCourseAminData, PageNumber, RowsOfPage, boxDataFlag]);

  const mentorFieldClickHadnler = (item) => {
    console.log("mentor item ==>", item);
    setMentorId(item.id);
  };

  const courseFieldClickHandler = (item) => {
    console.log("course item ==>", item);
    setCourseId(item.courseId);
  };

  return (
    <Container
      className="bg-transparent"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <CreateMentorForm
        formSubmitHandle={formSubmitHandle}
        mentorNameInputClick={() => {
          setBoxDataFlag(true);
        }}
        courseNameInputClick={() => {
          setBoxDataFlag(false);
        }}
        formData={{
          mentorData: mentorSingelData ? mentorSingelData : null,
          courseData: singelCourseAdmin ? singelCourseAdmin : null,
        }}
      />
      <div className="" style={{ width: "65%" }}>
        <Card>
          <Row md="12" className="text-center mt-2">
            <h2>لیست {boxDataFlag ? "منتورها" : "دوره ها"}</h2>
          </Row>
          <UserTable
            inputOptionClick={(optionValue) => setRowsOfPage(optionValue.label)}
          />
        </Card>
        {boxDataFlag && (
          <div style={{ marginTop: "-30px" }}>
            {fullData ? (
              <Export
                headers={headerData}
                dataMap={fullData}
                titleField="assistanceName"
                fieldKeys={["gmail"]}
                Btn={<Button color="primary"> انتخاب منتور </Button>}
                btnOnClick={mentorFieldClickHadnler}
                btnKeys={{ flag: false }}
              />
            ) : null}
            <SeparatedPagination
              RowsOfPage={RowsOfPage}
              totalCount={mentorListData?.length}
              changePageNumber={(pageNumber) => setPageNumber(pageNumber)}
            />
          </div>
        )}
        {!boxDataFlag && (
          <div style={{ marginTop: "-30px" }}>
            {allCourseAminData ? (
              <Export
                headers={courseHeaderData}
                dataMap={allCourseAminData}
                titleField="title"
                fieldKeys={[{ keyName: "isActive" }]}
                statusKey={{
                  isActive: {
                    trueField: "فعال",
                    falseField: "غیر فعال",
                  },
                }}
                Btn={<Button color="primary"> انتخاب دوره </Button>}
                btnOnClick={courseFieldClickHandler}
                btnKeys={{ flag: false }}
              />
            ) : null}
            <SeparatedPagination
              RowsOfPage={RowsOfPage}
              totalCount={courseListDataGet?.totalCount}
              changePageNumber={(pageNumber) => setCoursePageNumber(pageNumber)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default CreateMentor;
