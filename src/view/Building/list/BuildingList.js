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
import { NumberCards } from "../../../@core/constants/filters/Filters";
import { useEffect, useState } from "react";
import { getBuildingData } from "../../../@core/services/api";
import SearchQuery from "../../../@core/components/common/InputGroupButtons/SearchQuery";
import ModalForm from "../../../@core/components/common/modals/ModalForm";
import ChildrenModalBuilding from "../view/ChildrenModalBuilding";
import ButtonAction from "../../../@core/components/common/ButtonAction/ButtonAction";
import { MapButtonStatusBuilding } from "../../news/addCatgory/filterMap/MapButtonAction";
import StatusBuilding from "../view/StatusBuilding";
import EditModalBuilding from "../view/EditModalBuilding";

const BuildingList = () => {
  const headers = ["نام ساختمان", "طبقه", "تاریخ", "وضعیت", ""];

  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [RowsOfPage, setRowsOfPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const [BuildingId, setBuildingId] = useState(null);
  const [StatusFlag, setStatusFlag] = useState(null);
  const [EditModal, setEditModal] = useState(null);
  const [BuildingActive, setBuildingActive] = useState(null);
  // Pagination
  const paginationCalculator = (data, pageNumber, rowsOfPage) => {
    const startIndex = pageNumber * rowsOfPage;
    const endIndex = startIndex + rowsOfPage;
    const current = data.slice(startIndex, endIndex);
    setCurrentData(current);
    return current;
  };
  //
  const filteredData = listData.filter((item) =>
    item.buildingName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const paginated = paginationCalculator(
      filteredData,
      currentPage,
      RowsOfPage
    );
    setCurrentData(paginated);
  }, [searchQuery, listData, currentPage, RowsOfPage]);
  // get all building data using use Query
  const {
    data: allData,
    refetch,
    isLoading,
  } = getBuildingData("getListBuilding", "/Building");

  useEffect(() => {
    if (!isLoading && allData) {
      //   console.log(allData);
      setListData(allData);
      setCurrentPage(0);
      paginationCalculator(allData, currentPage, RowsOfPage);
    }
  }, [allData, isLoading]);

  useEffect(() => {
    refetch();
  }, []);

  // RowsOfPage
  const changeSelectRowsOfPage = (SelectNumber) => {
    setRowsOfPage(SelectNumber.label);
    setCurrentPage(0);
  };
  // searchQuery
  const changeSearchQuery = (searchQuery) => {
    setSearchQuery(searchQuery.target.value);
    setCurrentPage(0);
  };
  // PageNumber
  const changePageNumberPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentData(paginationCalculator(allData, currentPage, RowsOfPage));
  };

  const checkStatusBuilding = (elem) => {
    setBuildingId(elem.id);
    setBuildingActive(elem.active);
  };

  const changeEditHandle = (item) => {
    // console.log(item);
    if (item.title === "تغیر وضعیت") {
      setStatusFlag(true);
    }
    if (item.title === "ویرایش") {
      setEditModal(true);
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
                  title={"ساختمان جدید"}
                  children={<ChildrenModalBuilding />}
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
                titleField="buildingName"
                fieldKeys={["floor", "workDate", { keyName: "active" }]}
                hover={true}
                statusKey={{
                  active: {
                    trueField: "تایید شده",
                    falseField: "تایید نشده",
                  },
                }}
                clickHandle={checkStatusBuilding}
                Btn={
                  <ButtonAction
                    dataArray={MapButtonStatusBuilding}
                    itemClickHandle={changeEditHandle}
                  />
                }
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
            <StatusBuilding
              isOpen={StatusFlag}
              toggleFunction={() => setStatusFlag(false)}
              selectedId={BuildingId}
              isActive={BuildingActive}
            />
            <EditModalBuilding
              isOpen={EditModal}
              toggleFunction={() => setEditModal(false)}
              selectedId={BuildingId}
              isActive={BuildingActive}
            />
          </CardFooter>
        </Card>
      </Row>
    </Container>
  );
};
export default BuildingList;
