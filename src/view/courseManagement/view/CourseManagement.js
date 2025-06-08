import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";
import CardRoles from "../../../@core/components/common/CardRoles/CardRoles";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../@core/constants/filters/Filters";
import { Activity, Book, XCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Export from "../../../@core/components/common/Export/Export";
import { filterDataCourse } from "../list/filterDataCourse";
import {
  setIsActive,
  setPageNumber,
  setQuery,
  setRowsOfPage,
} from "../store/CourseListFilterSlice";
import { setCourseListChanges } from "../store/allDataCourseSlice";

const CourseManagement = () => {
  const headers = ["عنوان دوره", "وضعیت کلاس", "تاریخ", "سطح کلاس", ""];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    PageNumber,
    RowsOfPage,
    // SortingCol,
    // SortType,
    Query,
    IsActive,
  } = useSelector((state) => state.CourseListFilterSlice);
  const CourseListChanges = useSelector(
    (state) => state.allDataCourseSlice.CourseListChanges
  );
  const totalCount = useSelector(
    (state) => state.allDataCourseSlice.totalCount
  );
  // RowsOfPage
  const changeSelectRowsOfPage = (SelectNumber) => {
    console.log(SelectNumber.label);
    dispatch(setRowsOfPage(SelectNumber.label));
  };
  // searchQuery
  const changeSearchQuery = (searchQuery) => {
    console.log(searchQuery.target.value);
    dispatch(setQuery(searchQuery.target.value));
  };
  // PageNumber
  const changePageNumberPage = (pageNumber) => {
    console.log(pageNumber);
    dispatch(setPageNumber(pageNumber));
  };
  // IsActive
  const changeSelectActive = (SelectActive) => {
    console.log(SelectActive.value);
    if (SelectActive.value === "فعال") {
      dispatch(setIsActive(true));
    } else {
      dispatch(setIsActive(false));
    }
    // dispatch(setPageNumber(1));
  };
  // get data
  useEffect(() => {
    const getAllData = async () => {
      const course = await filterDataCourse({
        PageNumber,
        RowsOfPage,
        Query,
      });
      const filtered = course.data.filter((element) =>
        IsActive ? element.isActive === true : element.isActive === false
      );
      dispatch(
        setCourseListChanges({
          data: filtered,
          totalCount: course.totalCount,
        })
      );
    };
    getAllData();
  }, [PageNumber, RowsOfPage, Query, IsActive, dispatch]);
  const exportCardClickHandler = async (item) => {
    console.log(item.courseId);
    navigate(`/Course/Details/${item.courseId}`);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col md={4}>
              <CardRoles
                describe={"مجموع اخبار و مقالات"}
                icon={<Book color="blue" />}
              />
            </Col>
            <Col md={4}>
              <CardRoles
                describe={"اخبار و مقالات فعال"}
                icon={<Activity color="green" />}
              />
            </Col>
            <Col md={4}>
              <CardRoles
                describe={"اخبار و مقالات غیر فعال"}
                icon={<XCircle />}
              />
            </Col>
          </Row>
        </Col>
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
                <InputGroupButtons SearchQuery={changeSearchQuery} />
              </div>
              <div className="mt-2">
                <SelectReact
                  SelectFilter={SortType}
                  changeSelect={changeSelectActive}
                />
              </div>
              <div
                className="demo-inline-spacing mb-1"
                onClick={() => navigate("/createCourse")}
              >
                <Button.Ripple color="primary">افزودن دوره</Button.Ripple>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Export
              headers={headers}
              hasImage={true}
              dataMap={CourseListChanges}
              titleField="title"
              imageField="tumbImageAddress"
              fieldKeys={["typeName", "lastUpdate", "levelName"]}
              enableNavigate={true}
              clickHandle={(itemId) => exportCardClickHandler(itemId)}
            />
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

export default CourseManagement;
