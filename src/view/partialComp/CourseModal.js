import React, { useEffect } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Export from "../../@core/components/common/Export/Export";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseAdmin } from "../../@core/services/api";
import {
  addDataToAllCourseAdmin,
  changeAllCourseAdminPageNumber,
  changeAllCourseAdminQuery,
} from "../courseManagement/store/actions";
import SeparatedPagination from "../../@core/components/common/PaginationSeparated/PaginationSeparated";
import UserTable from "../user/list/UserTable";

const CourseModal = ({ isOpen, toggle, btnOnClick }) => {
  const dispatch = useDispatch();
  const { allCourseAdminDataSlice } = useSelector((state) => state);
  const {
    allCourseAminData,
    singelCourseAdmin,
    courseUserList,
    allCourseAminDataPageNumber,
    allCourseAminDataRowsOfPage,
    PageNumber,
    RowsOfPage,
    Query,
  } = allCourseAdminDataSlice;

  console.log(allCourseAminData);

  // get all course
  const { data, isLoading, refetch } = getAllCourseAdmin(
    "getAllCourseAdmin",
    "/Course/CourseList",
    { PageNumber, RowsOfPage, Query }
  );

  if (!isLoading) {
    dispatch(addDataToAllCourseAdmin(data));
  }

  // header data
  const headerData = ["نام دوره", "حالت فعالیت", "اقدامات"];

  const btn = <Button color="btn btn-primary">انتخاب</Button>;

  const courseBtnClickHandler = (item) => {
    btnOnClick(item)
    console.log("item ==>", item);
    toggle();
  };

  useEffect(() => {
    refetch();
  }, [PageNumber, RowsOfPage, Query]);

  return (
    <Modal
      toggle={toggle}
      isOpen={isOpen}
      className="modal-dialog modal-dialog-centered modal-lg"
    >
      <ModalHeader toggle={toggle}>
        <h1>انتخاب دوره</h1>
      </ModalHeader>
      <ModalBody>
        <Col>
          <Input
            type="text"
            placeholder="جست و جو"
            onChange={(event) =>
              dispatch(changeAllCourseAdminQuery(event.target.value))
            }
          />
        </Col>
        {allCourseAminData && (
          <Export
            headers={headerData}
            dataMap={allCourseAminData.courseDtos}
            hasImage={"tumbImageAddress"}
            imageField={"tumbImageAddress"}
            fieldKeys={[{ keyName: "isActive" }]}
            statusName={"isActive"}
            statusKey={{
              isActive: { trueField: "فعال", falseField: "غیرفعال" },
            }}
            hover={true}
            Btn={btn}
            btnOnClick={courseBtnClickHandler}
          />
        )}
      </ModalBody>
      <ModalFooter className="d-flex flex-row justify-content-center">
        <SeparatedPagination
          totalCount={allCourseAminData?.totalCount}
          RowsOfPage={RowsOfPage}
          changePageNumber={(pageNum) =>
            dispatch(changeAllCourseAdminPageNumber(pageNum))
          }
        />
      </ModalFooter>
    </Modal>
  );
};

export default CourseModal;
