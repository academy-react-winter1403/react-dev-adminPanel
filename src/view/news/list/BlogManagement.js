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
import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../@core/constants/filters/Filters";
import { Activity, Book, XCircle, XOctagon } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  handleIsActive,
  handleNewsListChanges,
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
} from "../store/NewsList";
import { getData } from "../../../@core/services/api/get-api/getData";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const {
    NewsListChanges,
    PageNumber,
    RowsOfPage,
    // SortingCol,
    // SortType,
    Query,
    IsActive,
  } = useSelector((state) => state.NewsList);
  // const stateNewsList = useSelector((state) => state.NewsList);
  // console.log("State NewsList:", stateNewsList);
  const changeSelectRowsOfPage = (SelectNumber) => {
    dispatch(handleRowsOfPage(SelectNumber));
    console.log("SelectNumber", SelectNumber);
  };
  const changeSelectActive = (SelectActive) => {
    if (SelectActive.value === "فعال") {
      dispatch(handleIsActive(true));
      console.log("isActive");
    } else {
      dispatch(handleIsActive(false));
      console.log("isNotActive");
    }
    console.log("SelectActive", SelectActive);
  };
  const changeSearchQuery = (searchQuery) => {
    dispatch(handleQuery(searchQuery));
    console.log("searchQuery", searchQuery.target.value);
  };
  const changePageNumberPage = (pageNumber) => {
    dispatch(handlePageNumber(pageNumber));
    console.log("pageNumber", pageNumber);
  };
  const { data, isLoading } = getData(
    "BlogManagement",
    `/News/AdminNewsFilterList?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&Query=${Query}&IsActive=${IsActive}`
  );
  if (!isLoading && !NewsListChanges) {
    console.log("ok");
    dispatch(handleNewsListChanges(data));
  }
  // &SortingCol=InsertDate&SortType=DESC
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
              <div className="demo-inline-spacing mb-1">
                <Button.Ripple color="primary">افزودن اخبار</Button.Ripple>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Export
            // dataMap={NewsListChanges}
            />
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination changePageNumber={changePageNumberPage} />
            </div>
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};

export default BlogManagement;
