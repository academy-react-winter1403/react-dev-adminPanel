import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardText,
    Col,
    Container,
    Input,
    Row,
  } from "reactstrap";
  import UserTable from "../../../user/list/UserTable";
  import Export from "../../../../@core/components/common/Export/Export";
  import InputGroupButtons from "../../../../@core/components/common/InputGroupButtons/InputGroupButtons";
  import SelectReact from "../../../../@core/components/common/Selection/Selection";
  import {
    headerData,
    NumberCards,
    SortType,
  } from "../../../../@core/constants/filters/Filters";
  import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
  import "../../../../@core/scss/me-style/font.scss";
  import { getCourseReservData } from "../../../../@core/services/api";
  import { useDispatch, useSelector } from "react-redux";
  import { addDataToCourseReservData, changeCourseReservPageNumber, changeCourseReservQuery, changeCourseReservRowsOfPage } from "../../store/actions";
  import { paginationCalculator } from "../../../../@core/hooks";
  import { useEffect, useState } from "react";
  
  const CoursePayment = () => {
    const dispatch = useDispatch();
    const exportHeaderData = ["نام کاربر", "نام دوره", "وضعیت پرداخت", "اقدام"];
    const { coursePaymentDataState } = useSelector(
      (state) => state.coursePaymentSlice
    );
    const [fullData, setFullData] = useState(null)
    const [searchData, setSearchData] = useState("")
    const [paginationData, setPaginationData] = useState(null)
  
    const { data, isLoading, refetch } = getCourseReservData(
      "getCourseReservData",
      "/CourseReserve"
    );
  
    if (!isLoading) {
      console.log("courseReserved ==>", data);
      dispatch(addDataToCourseReservData(data));
      if (!paginationData) {
          setPaginationData(data)
      }
    }
  
    const changePagination = () => {
      const paginationData = paginationCalculator(courseReservData, PageNumber, RowsOfPage)
      console.log("paginationData ==>", paginationData)
      setFullData(paginationData)
      setSearchData(paginationData)
    }
  
    const changeSelectRowsOfPage = (searchValue) => {
      dispatch(changeCourseReservRowsOfPage(searchValue.label))
    }
  
    const searchHandler = (searchValue) => {
      console.log(searchValue.target.value)
      const filteredData = fullData.filter(item => item.studentName.indexOf(searchValue.target.value) !== -1)
      setSearchData(filteredData)
    }
  
    const btnClickHandler = (item) => {
      console.log("item ==>", item)
    }
  
    useEffect(() => {
      if (coursePaymentDataState) {
          changePagination()
      }
    }, [coursePaymentDataState, PageNumber, RowsOfPage, Query])
  
    return (
      <Container>
        <Row>
          {/* <Card> */}
          {/* <CardHeader> */}
          <Col className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-1 mt-1">
              <div>
                <h3>نمایش:</h3>
              </div>
  
              <div className="rowsOfPage-input-control">
                <SelectReact
                  SelectFilter={NumberCards}
                    changeSelect={changeSelectRowsOfPage}
                />
              </div>
              {/* <div>
                <h3>وضعیت:</h3>
              </div> */}
              {/* <div className="m-0">
                <SelectReact
                  SelectFilter={SortType}
                    changeSelect={changeSelectActive}
                />
              </div> */}
            </div>
            <div className="d-flex gap-1" style={{width: "75%"}}>
              <Col className="mt-2" md="12">
                <InputGroupButtons onChange={searchHandler}/>
              </Col>
  
              {/* <div
                  className="demo-inline-spacing mb-1"
                  onClick={() => navigate("/createCourse")}
                >
                  <Button.Ripple color="primary">افزودن دوره</Button.Ripple>
                </div> */}
            </div>
          </Col>
          {/* </CardHeader> */}
          <CardBody>
            {searchData && (
              <Export
                headers={exportHeaderData}
                titleField="studentName"
                dataMap={searchData}
                fieldKeys={["courseName", { keyName: "accept" }]}
                statusKey={{
                  accept: {
                    falseField: "تایید نشده",
                    trueField: "تایید شده",
                  },
                }}
                Btn={<Button color="primary">جزئیات</Button>}
                btnOnClick={btnClickHandler}
              />
            )}
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              {courseReservData && (
                <SeparatedPagination
                  changePageNumber={(pageNum) => dispatch(changeCourseReservPageNumber(pageNum))}
                  totalCount={courseReservData.length}
                  RowsOfPage={RowsOfPage}
                />
              )}
            </div>
          </CardFooter>
          {/* </Card> */}
        </Row>
      </Container>
    );
  };
  
  export default CoursePayment;
  