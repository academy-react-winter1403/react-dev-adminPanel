import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  Container,
  Modal,
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
import ChildrenModalCategory from "./ChildrenModalCategory";
import { MapButtonAction } from "../filterMap/MapButtonAction";
import EditFormModal from "./EditFormModal";

const AddCatgory = () => {
  const headers = ["عنوان دسته ها", "تاریخ", "وضعیت"];
  const [dataCategory, setDataCategory] = useState([]);
  const [RowsOfPage, setRowsOfPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [editModalFlag, setEditModalFlag] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // get data
  const { data, isLoading } = getData(
    "AddCategory",
    "/News/GetListNewsCategory"
  );
  // Pagination
  const paginationCalculator = (data, pageNumber, rowsOfPage) => {
    const startIndex = pageNumber * rowsOfPage;
    const endIndex = startIndex + rowsOfPage;
    const currentData = data.slice(startIndex, endIndex);
    return currentData;
  };

  useEffect(() => {
    setCurrentPage(0);
    if (!isLoading && data) {
      setDataCategory(data);
      setCurrentData(paginationCalculator(data, currentPage, RowsOfPage));
      console.log(data.map((elem) => elem.id));
      setSelectedId(data.map((elem) => elem.id));
    }
  }, [isLoading, data]);
  // searchQuery
  const filteredData = dataCategory.filter((item) => {
    return item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  // setTotalCount(filteredData.length);
  const changeSearchQuery = (Query) => {
    setSearchQuery(Query.target.value);
    setCurrentPage(0);
  };
  //select page
  const changeSelectRowsOfPage = (SelectNumber) => {
    setRowsOfPage(SelectNumber.label);
    setCurrentPage(0);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
    setCurrentData(paginationCalculator(data, currentPage, RowsOfPage));
  };

  const handleButtonActionId = (elem) => {
    console.log("this is id card:",elem.id)
    setSelectedId(elem.id);
  }

  // Button Action
  const handleButtonAction = (item) => {
    console.log(item);
    if (item.title === "جزئیات") {
    }
    if (item.title === "ویرایش") {
      setEditModalFlag(true);
    }
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
                <ModalForm
                  title={"افزودن دسته بندی"}
                  children={<ChildrenModalCategory />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {currentData && (
              <Export
                headers={headers}
                hasImage={false}
                dataMap={currentData}
                fieldKeys={["insertDate"]}
                titleField="categoryName"
                btnOnClick={handleButtonActionId}
                Btn={
                  <ButtonAction
                    dataArray={MapButtonAction}
                    itemClickHandle={handleButtonAction}
                  />
                }
              />
            )}
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-center">
              <SeparatedPagination
                RowsOfPage={RowsOfPage}
                totalCount={filteredData.length}
                changePageNumber={(page) => changePageHandler(page)}
              />
            </div>
            <EditFormModal
              isOpen={editModalFlag}
              toggleFunction={() => setEditModalFlag(false)}
              selectedId={selectedId}
            />
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};
export default AddCatgory;
