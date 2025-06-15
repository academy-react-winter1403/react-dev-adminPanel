import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Container,
  Row,
} from "reactstrap";
import SelectReact from "../../../@core/components/common/Selection/Selection";
import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import { useDispatch, useSelector } from "react-redux";
import { NewNumberCards, NumberCards } from "../../../@core/constants/filters/Filters";
import {
  getCoursePaymentIdData,
  useDeleteData,
  usePutData,
} from "../../../@core/services/api";
import { useParams } from "react-router-dom";
import {
  setPaymentAllData,
  setPaymentId,
  setPaymentPageNumber,
  setPaymentQuery,
  setPaymentRowsOfPage,
} from "../store/CoursePaymentDetailSlice";
import ButtonAction from "../../../@core/components/common/ButtonAction/ButtonAction";
import { MapButtonStatus } from "./../../news/addCatgory/filterMap/MapButtonAction";
import SearchQuery from "../../../@core/components/common/InputGroupButtons/SearchQuery";

const CoursePaymentDetail = () => {
  const headers = ["نام دوره", "نام دانشجو", "تاریخ", "وضعیت", ""];
  const dispatch = useDispatch();
  const { CourseId } = useParams();

  const [paymentAllData, setPaymentAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [RowsOfPage, setRowsOfPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentData, setCurrentData] = useState(null);

  // Pagination
  const paginationCalculator = (data, pageNumber, rowsOfPage) => {
    const startIndex = pageNumber * rowsOfPage;
    const endIndex = startIndex + rowsOfPage;
    const current = data.slice(startIndex, endIndex);
    return current;
  };
  //
  const filteredData = paymentAllData.filter((item) => {
    return item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const paginated = paginationCalculator(
      filteredData,
      currentPage,
      RowsOfPage
    );
    setCurrentData(paginated);
  }, [searchQuery, paymentAllData, currentPage, RowsOfPage]);
  // get data
  const {
    data: paymentListData,
    isLoading,
    refetch,
  } = getCoursePaymentIdData(
    "getCoursePaymentIdData",
    "/CoursePayment",
    { CourseId: CourseId },
    CourseId,
    CourseId ? true : false
  );

  useEffect(() => {
    if (!isLoading && paymentListData) {
    setPaymentAllData(paymentListData);
    setCurrentPage(0);
    paginationCalculator(paymentListData, currentPage, RowsOfPage);
  }
  }, [isLoading,paymentListData]);

  // RowsOfPage
  const changeSelectRowsOfPage = (SelectNumber) => {
    console.log(SelectNumber.label);
    setRowsOfPage(SelectNumber.label);
    setCurrentPage(0);
  };
  // searchQuery
  const changeSearchQuery = (searchQuery) => {
    console.log(searchQuery.target.value);
    setSearchQuery(searchQuery.target.value);
    setCurrentPage(0);
  };
  // PageNumber
  const changePageNumberPage = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  const { mutate: putDataMutate } = usePutData("putCoursePaymentAllDataDetail");
  const { mutate: deleteDataMutate } = useDeleteData(
    "deleteCoursePaymentAllDataDetail"
  );
  const changePaymentId = (action, item) => {
    const formData = new FormData();
    formData.append("PaymentId", item.paymentId);
    console.log("paymentId:", item.paymentId);
    console.log(formData);
    if (action.title === "تایید") {
      console.log(action.title);
      putDataMutate(
        ["/CoursePayment/Accept", formData, "multipart/form-data"],
        {
          onSuccess: (data) => {
            console.log("Success:", data);
            refetch();
          },
          onError: (error) => {
            console.error("Error:", error);
          },
        }
      );
    }
    if (action.title === "حذف") {
      deleteDataMutate(["/CoursePayment", formData, "multipart/form-data"], {
        onSuccess: (data) => {
          console.log("Success:", data);
          refetch();
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      });
    }
  };

  return (
    <Fragment>
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
                    SelectFilter={NewNumberCards}
                    changeSelect={changeSelectRowsOfPage}
                  />
                </div>
              </div>
              <div className="d-flex gap-1">
                <div className="mt-2">
                  <SearchQuery onChange={changeSearchQuery} />
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {currentData && (
                <Export
                  headers={headers}
                  hasImage={false}
                  dataMap={currentData}
                  titleField="title"
                  fieldKeys={[
                    "studentName",
                    "peymentDate",
                    { keyName: "accept" },
                  ]}
                  hover={true}
                  statusKey={{
                    accept: {
                      trueField: "تایید شده",
                      falseField: "تایید نشده",
                    },
                  }}
                  Btn={({ item }) => (
                    <ButtonAction
                      dataArray={MapButtonStatus}
                      itemClickHandle={(action) =>
                        changePaymentId(action, item)
                      }
                    />
                  )}
                />
              )}
            </CardBody>
            <CardFooter>
              <div className="d-flex justify-content-center">
                <SeparatedPagination
                  changePageNumber={changePageNumberPage}
                    totalCount={filteredData.length}
                    RowsOfPage={RowsOfPage}
                />
              </div>
            </CardFooter>
          </Card>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CoursePaymentDetail;
