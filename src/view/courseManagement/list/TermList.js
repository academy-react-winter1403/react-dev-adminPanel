import React, { useEffect, useState } from "react";
import TermReport from "./TermReport";
import Export from "../../../@core/components/common/Export/Export";
import {
  createTermDate,
  createTermPost,
  getDeparmentData,
  updateTerm,
  updateTermDate,
  useGetTermList,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import { addDataToDepartmentSlice, addDataToTermList } from "../store/actions";
import { Button, Card, Col } from "reactstrap";
import UserTable from "../../user/list/UserTable";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../@core/hooks";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import ButtonAction from "../../../@core/components/common/ButtonAction/ButtonAction";
import {
  Archive,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Trash2,
} from "react-feather";
import TermFormComp from "./TermFormComp";
import TermCloseDateForm from "./TermCloseDateForm";
import toast from "react-hot-toast";

const TermList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { termListSlice, departmentSlice } = state;
  const { termList } = termListSlice;
  const { departmentSliceData } = departmentSlice;
  const [fullData, setFullData] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(12);
  const [modalFlag, setModalFlag] = useState(false);
  const [termCloseDateFormShowFlag, setTermCloseDateFormShowFlag] =
    useState(false);
  const [modalBtnText, setModalBtnText] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [closeDateFormTitle, setCloseDateFormTitle] = useState("");
  const [oneFormFieldFlag, setOneFormFieldFlag] = useState(false);
  const [claseDateFormFieldFlag, setCloseDateFormFieldFlag] = useState(false);

  const [termFormData, setTermFormData] = useState("");

  const { data, isLoading, refetch } = getDeparmentData(
    "getDepartmentData",
    "/Department"
  );

  if (!isLoading) {
    dispatch(addDataToDepartmentSlice(data));
  }

  // header data
  const headerData = [
    "آیدی",
    "نام ترم",
    "تاریخ شروع / پایان",
    "نام بخش",
    "وضعیت",
    "اقدام",
  ];

  const dropItem = [
    { title: "ویرایش", icon: <FileText size={14} /> },
    { title: "ویرایش زمان", icon: <FileText size={14} /> },
  ];

  // get term list
  const {
    data: termListData,
    isLoading: getTermListLoading,
    refetch: termGetDataRefetch,
  } = useGetTermList("getTermList", "/Term");

  if (!getTermListLoading) {
    console.log("termListData ==>", termListData);
    dispatch(addDataToTermList(termListData));
  }

  console.log("searchData ==>", searchData)

  // handle search
  const searchHandler = (searchValue) => {
    const filterData = searchData.filter(
      el => el.termName.indexOf(searchValue) !== -1
    );
    setFullData(filterData);
  };

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
    setSearchData(paginationData);
  };

  useEffect(() => {
    if (termList) {
      changeData();
    }
  }, [termList, pageNumber, rowsOfPage]);

  const status = <span className="me-1 badge bg-light-danger">Hello</span>;

  const editeComp = (
    <div>
      <FileText size={14} />
      <span> وبرایش </span>
    </div>
  );

  const { mutate: updateTermMutate } = updateTerm("updateTerm");
  const { mutate: createTermMutate } = createTermPost("createTermPost");
  const formSubmitHandler = (values) => {
    let dataObj = {
      id: values.departmentId,
      termName: values.termName,
      departmentId: values.departmentId,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    if (modalBtnText === "تایید") {
      const expireValue = values.expire === "2" ? true : false;
      dataObj = { ...dataObj, expire: expireValue };
      updateTermMutate(["/Term", dataObj], {
        onSuccess: (data) => {
          console.log("term update full😍😍 ==>", data);
          toast.success(data.message);
          termGetDataRefetch();
          setModalFlag(false);
        },
      });
      console.log("form values ==>", values);
    } else {
      createTermMutate(["/Term", dataObj], {
        onSuccess: (data) => {
          // console.log("created term full😍😍 ==>", data)
          toast.success(data.message);
          termGetDataRefetch();
          setModalFlag(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  const { mutate: updateTermDateMutate } = updateTermDate("updateTermDate");
  const { mutate: createTermDateMutate } = createTermDate("createTermDatePost");
  const form2SubmitHandler = (values) => {
    let dataObj = {
      startCloseDate: values.startDate,
      endCloseDate: values.endDate,
      termId: values.termId,
      closeReason: values.closeReason,
    };
    if (modalBtnText === "تایید") {
      const id = JSON.stringify(termFormData.id);
      dataObj = { ...dataObj, id: id };
      console.log(dataObj);
      updateTermDateMutate(["/Term/UpdateTermCloseDate", dataObj], {
        onSuccess: (data) => {
          toast.success(data.message);
          termGetDataRefetch();
          setTermCloseDateFormShowFlag(false);
        },
        // onError: (error) => {
        //     toast.error(error.message)
        // }
      });
    } else {
      createTermDateMutate(["/Term/AddTermCloseDate", dataObj], {
        onSuccess: (data) => {
          toast.success(data.message);
          termGetDataRefetch();
          setTermCloseDateFormShowFlag(false);
        },
      });
    }
    console.log(values);
  };

  const editeBtnClickHandler = (item) => {
    // setTermFormData(item)
    console.log("item ==>", item);
    if (item.title === "ویرایش") {
      setModalFlag(!modalFlag);
      setFormTitle("ویرایش اطلاعات فرم");
      setOneFormFieldFlag(true);
    } else {
      setCloseDateFormTitle("ویرایش تاریخ بسته بودن");
      setTermCloseDateFormShowFlag(true);
      setCloseDateFormFieldFlag(false);
    }
  };

  const cardClickHadnler = (item) => {
    console.log(item);
    setTermFormData(item);
  };

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
              btnContentText={"افزودن ترم"}
              changeSearchInput={searchHandler}
              inputOptionClick={(inputValue) => setRowsOfPage(inputValue.label)}
              addBtnClick={() => {
                setModalFlag(!modalFlag);
                setModalBtnText("ساختن");
                setFormTitle("ساخت ترم");
                setOneFormFieldFlag(false);
                setTermFormData(null);
                // dispatch(addDataToDepartmentDetail(null));
              }}
              secondBtnTextContent={"افزودن زمان"}
              secondBtnClick={() => {
                // setModalFlag(!modalFlag);
                setTermCloseDateFormShowFlag(!termCloseDateFormShowFlag);
                setModalBtnText("ساختن");
                setFormTitle("ساخت تاریخ بسته بودن");
                setCloseDateFormFieldFlag(true);
                setCloseDateFormTitle("ساخت تاریخ بسته بودن");
                setTermFormData(null);
              }}
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
                Btn={
                  <ButtonAction
                    dataArray={dropItem}
                    itemClickHandle={editeBtnClickHandler}
                  />
                }
                // Btn={editeComp}
                btnOnClick={() => {
                  setModalBtnText("تایید");
                }}
                clickHandle={cardClickHadnler}
              />
            )}
          </Col>
          <SeparatedPagination
            totalCount={termList?.length}
            RowsOfPage={rowsOfPage}
            changePageNumber={(pageNumber) => setPageNumber(pageNumber)}
          />
          {departmentSliceData && (
            <TermFormComp
              isOpen={modalFlag}
              toggle={() => setModalFlag(!modalFlag)}
              title={formTitle}
              btnTextContent={modalBtnText}
              inputOptionData={departmentSliceData}
              formSubmitHandle={formSubmitHandler}
              statusFlag={oneFormFieldFlag}
              formData={termFormData && termFormData}
            />
          )}
          <TermCloseDateForm
            isOpen={termCloseDateFormShowFlag}
            toggle={() =>
              setTermCloseDateFormShowFlag(!termCloseDateFormShowFlag)
            }
            termFieldFlag={claseDateFormFieldFlag}
            title={closeDateFormTitle}
            btnTextContent={modalBtnText}
            formSubmitHandle={form2SubmitHandler}
            formData={termFormData}
            termList={termList}
          />
        </Card>
      </div>
    </div>
  );
};

export default TermList;
