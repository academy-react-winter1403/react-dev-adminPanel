import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Container,
  Row,
} from "reactstrap";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../@core/constants/filters/Filters";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumberMyCourse,
  setQueryMyCourse,
  setRowsOfPageMyCourse,
} from "../store/myCourseListFilterSlice";
import { setMyCourseListChanges } from "../store/allDataMyCourseSlice";
import { useEffect } from "react";
import { getTeacherCourses } from "../../../@core/services/api/get-api/getListData";
import SearchQuery from "../../../@core/components/common/InputGroupButtons/SearchQuery";

const MyCourses = () => {
  const headers = ["عنوان دوره", "وضعیت کلاس", "تاریخ", "سطح کلاس", ""];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { PageNumber, RowsOfPage, SortingCol, SortType, Query } = useSelector(
    (state) => state.myCourseListFilterSlice
  );
  const { MyCourseListChanges, totalCount } = useSelector(
    (state) => state.allDataMyCourseSlice
  );
  // RowsOfPage
  const changeSelectRowsOfPage = (SelectNumber) => {
    console.log(SelectNumber.label);
    dispatch(setRowsOfPageMyCourse(SelectNumber.label));
  };
  // searchQuery
  const changeSearchQuery = (searchQuery) => {
    console.log(searchQuery.target.value);
    dispatch(setQueryMyCourse(searchQuery.target.value));
  };
    // PageNumber
  const changePageNumberPage = (pageNumber) => {
    console.log(pageNumber);
    dispatch(setPageNumberMyCourse(pageNumber));
  };
  // get data
  const { data, refetch, isLoading } = getTeacherCourses(
    "getTeacherCourses",
    "/Course/TeacherCourseList",
    {
      PageNumber,
      RowsOfPage,
      // SortingCol,
      // SortType,
      Query,
    }
  );

  if (!isLoading) {
    dispatch(setMyCourseListChanges(data?.teacherCourseDtos));
  }

  useEffect(() => {
    refetch();
  }, []);

  const exportCardClickHandler = async (item) => {
    console.log(item.courseId);
    navigate(`/Course/Details/${item.courseId}`);
  };
  return (
    <Container>
      <Row>
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center gap-1 mt-1">
              <div>
                <CardText>نمایش:</CardText>
              </div>
              <div>
                <SelectReact
                  SelectFilter={NumberCards}
                  changeSelect={changeSelectRowsOfPage}
                />
              </div>
            </div>
            <div className="d-flex gap-1">
              <div className="mt-2">
                <SearchQuery onChange={changeSearchQuery} />
              </div>
              <div className="mt-2">
                {/* <SelectReact
                //   SelectFilter={SortType}
                //   changeSelect={changeSelectActive}
                /> */}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {MyCourseListChanges && (
              <Export
                headers={headers}
                hasImage={true}
                dataMap={MyCourseListChanges}
                titleField="title"
                imageField="tumbImageAddress"
                fieldKeys={["typeName", "lastUpdate", "levelName"]}
                //   enableNavigate={true}
                clickHandle={(itemId) => exportCardClickHandler(itemId)}
              />
            )}
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination
                changePageNumber={changePageNumberPage}
                totalCount={totalCount}
                RowsOfPage={RowsOfPage}
              />
            </div>
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};
export default MyCourses;
