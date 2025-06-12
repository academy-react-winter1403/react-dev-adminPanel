import React, { useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Export from "../../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import InputGroupButtons from "../../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import { getAllCourseAdmin } from "../../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import { addDataToAllCourseAdmin, changeAllCourseAdminPageNumber, changeAllCourseAdminQuery } from "../../store/actions";

const CoursePageModal = ({
  isOpen,
  toggle,
  btnOnClick,
}) => {
    const dispatch = useDispatch()
    const {
        allCourseAminData,
        PageNumber: adminCoursePageNumber,
        RowsOfPage: adminCourseRowsOfPage,
        Query: adminCourseQuery,
      } = useSelector((state) => state.allCourseAdminDataSlice);
  const headerData = ["نام دوره", "وضعیت", "عملیات"];

  // get course list data
  const {
    data: courseListDataGet,
    isLoading: courseListDataLoading,
    refetch: courseListDataRefetch,
  } = getAllCourseAdmin("getCourseListData", "/Course/CourseList", {
    PageNumber: adminCoursePageNumber,
    RowsOfPage: adminCourseRowsOfPage,
    Query: adminCourseQuery,
  });
  if (!courseListDataLoading) {
    dispatch(addDataToAllCourseAdmin(courseListDataGet.courseDtos));
  }

  useEffect(() => {
    courseListDataRefetch();
  }, [adminCoursePageNumber, adminCourseRowsOfPage, adminCourseQuery]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggle}>
        <h1>اطلاعات دوره</h1>
      </ModalHeader>
      <ModalBody>
        <InputGroupButtons onChange={(searchValue) => dispatch(changeAllCourseAdminQuery(searchValue.target.value))} />
        <Export
          headers={headerData}
          dataMap={allCourseAminData}
          titleField="title"
          fieldKeys={[{ keyName: "isActive" }]}
          statusKey={{
            isActive: {
              trueField: "فعال",
              falseField: "غیر فعال",
            },
          }}
          Btn={<Button color="primary">انتخاب</Button>}
          btnOnClick={btnOnClick}
          btnKeys={{ flag: false }}
        />
        <SeparatedPagination
          totalCount={courseListDataGet?.totalCount}
          RowsOfPage={adminCourseRowsOfPage}
          changePageNumber={(pageNumber) => dispatch(changeAllCourseAdminPageNumber(pageNumber))}
        />
      </ModalBody>
    </Modal>
  );
};

export default CoursePageModal;
