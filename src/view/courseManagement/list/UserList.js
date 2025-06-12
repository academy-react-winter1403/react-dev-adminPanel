import React, { useEffect, useState } from "react";
import UserTable from "../../user/list/UserTable";
import { Button, Card, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import Export from "../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import {
  getAllCourseAdmin,
  getCourseAdminWithId,
  getCourseGroupsWithId,
  getCourseUserListData,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataToAllCourseAdmin,
  addDataToCourseUserList,
  changeAllCourseAdminPageNumber,
  changeAllCourseAdminQuery,
  changeAllCourseAdminRowsOfPage,
} from "../store/actions";
import { addedDataToObject } from "../../../@core/hooks";
import { http } from "../../../@core/services/interceptor";
import CourseModal from "../../partialComp/CourseModal";

const UserList = () => {
  const dispatch = useDispatch();
  const { allCourseAdminDataSlice } = useSelector((state) => state);
  const {
    allCourseAminData,
    singelCourseAdmin,
    courseUserList,
    PageNumber,
    RowsOfPage,
    Query,
  } = allCourseAdminDataSlice;
  const [fullData, setFullData] = useState([1, 2]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [modalFlag, setModalFlag] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [productId, setProductId] = useState(null);
  const [query, setQuery] = useState("");
  const headerData = [
    "گروه",
    "کاربر",
    "نمره",
    "وضعیت",
    "حذف شده",
    "فعال / غیرفعال",
    ""
  ];
  const courseModalHeaderData = ["نام دوره", "وضعیت", "عملیات"];

  // get all course
  const { data, isLoading, refetch } = getAllCourseAdmin(
    "getAllCourseAdmin",
    "/Course/CourseList",
    { PageNumber, RowsOfPage, Query }
  );

  if (!isLoading) {
    dispatch(addDataToAllCourseAdmin(data));
  }

  const courseSearchHandler = (searchValue) => {
    dispatch(changeAllCourseAdminQuery(searchValue.target.value));
  };

  useEffect(() => {
    refetch();
  }, [PageNumber, Query]);

  console.log("allCourseAminData ==>", allCourseAminData);

  const status = <span></span>;

  const paymentElem = (
    <Button
      className="badge bg-light-primary"
      type="button"
      style={{ paddingBlock: "8px", paddingInline: "12px" }}
    ></Button>
  );

  const isDeletedElem = (
    <Button
      className="badge bg-light-primary"
      type="button"
      style={{ paddingBlock: "8px", paddingInline: "12px" }}
    ></Button>
  );

  const isActiveElem = (
    <Button
      className="badge bg-light-primary"
      type="button"
      style={{ paddingBlock: "8px", paddingInline: "12px" }}
    ></Button>
  );

  const btn = (
    <Button
      className="badge bg-light-primary"
      type="button"
      style={{ paddingBlock: "8px", paddingInline: "12px" }}
    >
      انتخاب
    </Button>
  );

  const {
    data: courseUserListData,
    refetch: courseUserListRefetch,
    isLoading: courseUserListLoading,
  } = getCourseUserListData(
    "getCourseUserListData",
    "/CourseUser/GetCourseUserList",
    {
      courseId: productId,
      PageNumber: PageNumber,
      RowsOfPage: RowsOfPage,
      Query: Query,
    },
    productId === 0 || productId !== null ? true : false
  );

  if (!courseUserListLoading) {
    dispatch(addDataToCourseUserList(courseUserListData));
  }

  console.log("allCourseAminData ==>", allCourseAminData)

  useEffect(() => {
    if (productId) {
      courseUserListRefetch();
    }
  }, [productId, PageNumber, RowsOfPage, Query]);

  const courseBtnClickHandler = (item) => {
    console.log("item ==>", item)
    setProductId(item.courseId);
    setModalFlag(!modalFlag);
  };
  return (
    <div>
      <Card>
        <UserTable
          btnContentText={"انتخاب دوره"}
          addBtnClick={() => setModalFlag(!modalFlag)}
          inputOptionClick={(rowsValue) => dispatch(changeAllCourseAdminRowsOfPage(rowsValue))}
          changeSearchInput={(searchValue) => dispatch(changeAllCourseAdminQuery(searchValue))}
        />
        {courseUserList && (
          <Export
            headers={headerData}
            dataMap={courseUserList}
            titleField="groupName"
            fieldKeys={[
              "studentName",
              "courseGrade",
              { paymentElem, keyName: "paymentElem" },
              { isDeletedElem, keyName: "isDeletedElem" },
              { isActiveElem, keyName: "isActiveElem" },
            ]}
            statusName={"peymentDone"}
            statusKey={{
              paymentElem: {
                falseField: "پرداخت نشده",
                trueField: "پرداخت شده",
              },
              isDeletedElem: { falseField: "غیرحذف شده", trueField: "حذف شده" },
              isActiveElem: { falseField: "غیرفعال", trueField: "فعال" },
            }}
            btnKeys={{ flag: false }}
          />
        )}
        <SeparatedPagination
          totalCount={fullData.length}
          RowsOfPage={rowsOfPage}
          changePageNumber={(pageNum) => setPageNumber(pageNum)}
        />
      </Card>
      {/* <Modal
        isOpen={modalFlag}
        toggle={() => setModalFlag(!modalFlag)}
        className="w-100 modal-dialog modal-dialog-centered modal-lg"
      >
        <ModalHeader className="flex flex-row justify-content-center">
          <label style={{ fontSize: "20px", fontFamily: "tahoma" }}>
            دوره را انتخاب کنید
          </label>
        </ModalHeader>
        <ModalBody>
          <InputGroupButtons
            placeholder={"جست و جو"}
            onChange={courseSearchHandler}
          />
          {allCourseAminData && (
            <Export
              headers={courseModalHeaderData}
              dataMap={allCourseAminData.courseDtos}
              hasImage={"tumbImageAddress"}
              imageField="tumbImageAddress"
              fieldKeys={[{keyName: "isActive"}]}
              // statusName={"isActive"}
              statusKey={{isActive: { trueField: "فعال", falseField: "غیرفعال" }}}
              hover={true}
              Btn={btn}
              btnOnClick={courseBtnClickHandler}
            />
          )}
        </ModalBody>
        <SeparatedPagination
          totalCount={allCourseAminData?.totalCount}
          RowsOfPage={RowsOfPage}
          changePageNumber={(pageNum) =>
            dispatch(changeAllCourseAdminPageNumber(pageNum))
          }
        />
      </Modal> */}
      <CourseModal isOpen={modalFlag} toggle={() => setModalFlag(!modalFlag)} btnOnClick={courseBtnClickHandler}/>
    </div>
  );
};

export default UserList;
