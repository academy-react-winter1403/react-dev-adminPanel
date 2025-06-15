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
  Table,
} from "reactstrap";
import CardRoles from "../../../@core/components/common/CardRoles/CardRoles";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
// import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../@core/constants/filters/Filters";
import { Activity, Book, XCircle, XOctagon } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  handleIsActive,
  handlePageNumber,
  handleQuery,
  handleRowsOfPage,
} from "../store/NewsListFilterSlice";
import { useEffect } from "react";
import { filterDataNews } from "./filterDataNews";
import { handleNewsListChanges } from "../store/allDataNewsSlice";
import { useNavigate } from "react-router-dom";
import Export from "./../../../@core/components/common/Export/Export";
import SearchQuery from "../../../@core/components/common/InputGroupButtons/SearchQuery";

const BlogManagement = () => {
  const headers = ["عنوان اخبار", "امتیاز", "تاریخ",""]
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    PageNumber,
    RowsOfPage,
    // SortingCol,
    // SortType,
    Query,
    IsActive,
  } = useSelector((state) => state.NewsListFilterSlice);
  const { NewsListChanges, totalCount } = useSelector(
    (state) => state.allDataNewsSlice
  );
  // RowsOfPage
  const changeSelectRowsOfPage = (SelectNumber) => {
    dispatch(handleRowsOfPage(SelectNumber.label));
  };
  // IsActive
  const changeSelectActive = (SelectActive) => {
    if (SelectActive.value === "فعال") {
      dispatch(handleIsActive(true));
    } else {
      dispatch(handleIsActive(false));
    }
  };
  // searchQuery
  const changeSearchQuery = (searchQuery) => {
    dispatch(handleQuery(searchQuery.target.value));
  };
  // PageNumber
  const changePageNumberPage = (pageNumber) => {
    dispatch(handlePageNumber(pageNumber));
  };
  // get data
  useEffect(() => {
    const getAllData = async () => {
      const news = await filterDataNews({
        PageNumber,
        RowsOfPage,
        Query,
        IsActive,
      });
      dispatch(handleNewsListChanges(news));
    };
    getAllData();
  }, [PageNumber, RowsOfPage, Query, IsActive, dispatch]);
  // &SortingCol=InsertDate&SortType=DESC

  const dataWithRatio = NewsListChanges.map((item) => ({
    ...item,
    likeRatio: `${item.currentLikeCount}/${item.currentDissLikeCount}`,
  }));
  const exportCardClickHandler = async (item) => {
    console.log(item.id)
    navigate(`/blogs/view/${item.id}`)    
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
                <SearchQuery onChange={changeSearchQuery} />
              </div>
              <div className="mt-2">
                <SelectReact
                  SelectFilter={SortType}
                  changeSelect={changeSelectActive}
                />
              </div>
              <div
                className="demo-inline-spacing mb-1"
                onClick={() => navigate("/createBlog")}
              >
                <Button.Ripple color="primary">افزودن اخبار</Button.Ripple>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Export
              headers={headers}
              hasImage={true}
              dataMap={dataWithRatio}
              titleField="title"
              imageField="currentImageAddressTumb"
              fieldKeys={["likeRatio", "insertDate"]}
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

export default BlogManagement;
