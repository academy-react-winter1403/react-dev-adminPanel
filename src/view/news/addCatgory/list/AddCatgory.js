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
import SelectReact from "../../../../@core/components/common/Selection/Selection";
import InputGroupButtons from "../../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import Export from "../../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import {
  NumberCards,
  SortType,
} from "../../../../@core/constants/filters/Filters";
import { getData } from "../../../../@core/services/api";
import { useEffect, useState } from "react";
import ButtonAction from "../../../../@core/components/common/ButtonAction/ButtonAction";
import ModalForm from "../../../../@core/components/common/modals/ModalForm";
<<<<<<< HEAD
import { paginationCalculator } from "../../../../@core/hooks";
=======
import ChildrenModalCategory from "./ChildrenModalCategory";
>>>>>>> 39ce923acbadf83d248a4d20ae59361e81172796

const AddCatgory = () => {
  const headers = ["عنوان دسته ها", "تاریخ", "وضعیت"];
  const [dataCategory, setDataCategory] = useState([]);
  const [RowsOfPage, setRowsOfPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentData, setCurrentData] = useState(null);
  // get data
  const { data, isLoading } = getData(
    "AddCategory",
    "/News/GetListNewsCategory"
  );
<<<<<<< HEAD

  // const paginationCalculator = (data, pageNumber, rowsOfPage) => {
  //   const startIndex = pageNumber * rowsOfPage;
  //   const endIndex = startIndex + rowsOfPage;
  //   const currentData = data.slice(startIndex, endIndex);
  //   return currentData;
  // };

=======
>>>>>>> 39ce923acbadf83d248a4d20ae59361e81172796
  useEffect(() => {
    setCurrentPage(0);
    if (!isLoading && data) {
      setDataCategory(data);
      setCurrentData(paginationCalculator(data, currentPage, RowsOfPage))
    }
  }, [isLoading, data]);
<<<<<<< HEAD

  if (currentData) {
    console.log("currentData ==>", currentData)
  }

=======
>>>>>>> 39ce923acbadf83d248a4d20ae59361e81172796
  // searchQuery
  const filteredData = dataCategory.filter((item) => {
    return item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  // setTotalCount(filteredData.length);
  const changeSearchQuery = (Query) => {
    setSearchQuery(Query.target.value);
    setCurrentPage(0);
  };
  // Pagination
<<<<<<< HEAD

  // const startIndex = currentPage * RowsOfPage;
  // const endIndex = startIndex + RowsOfPage;
  // const currentData = filteredData.slice(startIndex, endIndex);
  // console.log(currentData);

=======
  const startIndex = currentPage * RowsOfPage;
  const endIndex = startIndex + RowsOfPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  console.log(currentData);
>>>>>>> 39ce923acbadf83d248a4d20ae59361e81172796
  //select page
  const changeSelectRowsOfPage = (SelectNumber) => {
    setRowsOfPage(SelectNumber.label);
    setCurrentPage(0);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
    setCurrentData(paginationCalculator(data, currentPage, RowsOfPage))
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
                <InputGroupButtons SearchQuery={changeSearchQuery} />
              </div>
              <div className="demo-inline-spacing mb-1">
<<<<<<< HEAD
                <ModalForm title={"افزودن دسته بندی"} />
=======
                <ModalForm
                  title={"افزودن دسته بندی"}
                  children={<ChildrenModalCategory />}
                />
>>>>>>> 39ce923acbadf83d248a4d20ae59361e81172796
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {currentData && <Export
              headers={headers}
              hasImage={false}
              dataMap={currentData}
              fieldKeys={["insertDate"]}
              titleField="categoryName"
              Btn={<ButtonAction />}
            />}
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination
                RowsOfPage={RowsOfPage}
                totalCount={filteredData.length}
                changePageNumber={(page) => changePageHandler(page)}
              />
            </div>
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};
export default AddCatgory;
