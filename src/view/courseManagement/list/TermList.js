import React, { useEffect, useState } from "react";
import TermReport from "./TermReport";
import Export from "../../../@core/components/common/Export/Export";
import { useGetTermList } from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import { addDataToTermList } from "../store/actions";
import { Button, Card, Col } from "reactstrap";
import UserTable from "../../user/list/UserTable";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";

const TermList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { termListSlice } = state;
  const { termList } = termListSlice;
  const [fullData, setFullData] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(12);

  // header data
  const headerData = [
    "آیدی",
    "نام ترم",
    "تاریخ شروع / پایان",
    "نام بخش",
    "وضعیت",
    "اقدام",
  ];

  // get term list
  const { data: termListData, isLoading: getTermListLoading } = useGetTermList(
    "getTermList",
    "/Term"
  );

  if (!getTermListLoading) {
    console.log("termListData ==>", termListData);
    dispatch(addDataToTermList(termListData));
  }

  // change
  const changeData = () => {
    let startDate;
    let endDate;
    let fullDate;
    let dataObj;
    const data = addedDataToObject(termList, (item) => {
      startDate = ChangeMoment(item.startDate, "YYYY/MM/DD", "persian");
      endDate = ChangeMoment(item.endDate, "YYYY/MM/DD", "persian");
      fullDate = `${endDate} تا ${startDate}`;
      dataObj = { ...item, fullDate };
      return dataObj;
    });
    let paginationData = paginationCalculator(data, pageNumber, rowsOfPage);
    setFullData(paginationData);
  };

  useEffect(() => {
    if (termList) {
      changeData();
    }
  }, [termList, pageNumber, rowsOfPage]);

  const status = <span className="me-1 badge bg-light-danger">Hello</span>

  return (
    <div>
      <div
        className="top-control"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <TermReport />
      </div>
      <div className="bottom">
        <Card>
          <Col className="m-0">
            <UserTable
              createNewUserHandler={""}
              btnContentText={"افزودن بخش"}
              // changeSearchInput={searchHandler}
              inputOptionClick={(inputValue) => setRowsOfPage(inputValue.label)}
              // addBtnClick={() => {
              //   setModalFlag(!modalFlag);
              //   setCreateBtnText("ساختن");
              //   dispatch(addDataToDepartmentDetail(null));
              // }}
            />
          </Col>
          <Col>
            {fullData && (
              <Export
                headers={headerData}
                dataMap={fullData}
                titleField="id"
                fieldKeys={["termName", "fullDate", "departmentName", status]}
                statusName={"expire"}
                hover={true}
                exportProperty={"hover"}
              />
            )}
          </Col>
          <SeparatedPagination
            totalCount={termList?.length}
            RowsOfPage={rowsOfPage}
            changePageNumber={(pageNumber) => setPageNumber(pageNumber)}
          />
        </Card>
      </div>
    </div>
  );
};

export default TermList;
