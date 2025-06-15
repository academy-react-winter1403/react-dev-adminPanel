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
import SearchQuery from "../../../../@core/components/common/InputGroupButtons/SearchQuery";
import DetailsFormModal from "./DetailsFormModal";

const AddCatgory = () => {
  const headers = ["عنوان دسته ها", "تاریخ", "وضعیت"];

  const [dataCategory, setDataCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [RowsOfPage, setRowsOfPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentData, setCurrentData] = useState(null);

  const [editModalFlag, setEditModalFlag] = useState(null);
  const [DetailsFlag, setDetailsFlag] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  // Pagination
  const paginationCalculator = (data, pageNumber, rowsOfPage) => {
    const startIndex = pageNumber * rowsOfPage;
    const endIndex = startIndex + rowsOfPage;
    const current = data.slice(startIndex, endIndex);
    return current;
  };
  //
  const filteredData = dataCategory.filter((item) => {
    return item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const paginated = paginationCalculator(
      filteredData,
      currentPage,
      RowsOfPage
    );
    setCurrentData(paginated);
  }, [searchQuery, dataCategory, currentPage, RowsOfPage]);

  // get data
  const {
    data: allData,
    isLoading,
    refetch,
  } = getData("AddCategory", "/News/GetListNewsCategory");

  useEffect(() => {
    if (!isLoading && allData) {
      setDataCategory(allData);
      setCurrentPage(0);
      paginationCalculator(allData, currentPage, RowsOfPage);
    }
  }, [isLoading, allData]);

  useEffect(() => {
    refetch();
  }, []);

  // RowsOfPage
  const changeSelectRowsOfPage = (SelectNumber) => {
    setRowsOfPage(SelectNumber.label);
    setCurrentPage(0);
  };
  // searchQuery
  const changeSearchQuery = (Query) => {
    setSearchQuery(Query.target.value);
    setCurrentPage(0);
  };
  // PageNumber
  const changePageHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleButtonActionId = (elem) => {
    setSelectedId(elem.id);
  };

  // Button Action
  const handleButtonAction = (item) => {
    if (item.title === "جزئیات") {
      setDetailsFlag(true);
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
                <SearchQuery onChange={changeSearchQuery} />
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
                hover={true}
                hasImage={false}
                dataMap={currentData}
                fieldKeys={["insertDate"]}
                titleField="categoryName"
                clickHandle={handleButtonActionId}
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
                changePageNumber={changePageHandler}
              />
            </div>
            <EditFormModal
              isOpen={editModalFlag}
              toggleFunction={() => setEditModalFlag(false)}
              selectedId={selectedId}
            />
            <DetailsFormModal
              isOpen={DetailsFlag}
              toggleFunction={() => setDetailsFlag(false)}
              selectedId={selectedId}
            />
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};
export default AddCatgory;
