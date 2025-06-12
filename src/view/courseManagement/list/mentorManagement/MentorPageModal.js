import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import Export from "../../../../@core/components/common/Export/Export";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import InputGroupButtons from "../../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import {
  getAllCourseAdmin,
  getMentorListData,
} from "../../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataToAllCourseAdmin,
  changeAllCourseAdminPageNumber,
  changeAllCourseAdminQuery,
} from "../../store/actions";
import { addedDataToObject, ChangeMoment, paginationCalculator } from "../../../../@core/hooks";

const MentorPageModal = ({ isOpen, toggle, btnOnClick }) => {
  const [courseData, setCourseData] = useState(null);
  const [PageNumber, setPageNumber] = useState(1);
  const [RowsOfPage, setRowsOfPage] = useState(10);
  const [Query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const headerData = ["نام منتور", "ایمیل منتور", "عملیات"];
  const { data: mentorListDataGet, isLoading } = getMentorListData(
    "getMentorListData",
    "/CourseAssistance"
  );

  if (!isLoading) {
    console.log("mentor data ==>", mentorListDataGet);
    if (!courseData) {
        setCourseData(mentorListDataGet);
    }
  }

  useEffect(() => {
    setCourseData(null)
  }, [isLoading])

  const changePaginationAndMoment = () => {
    const momentCalc = addedDataToObject(courseData, (item) => {
      const inserDate = ChangeMoment(item.inserDate, "YYYY/MM/DD", "persian");
      const newObject = { ...item, inserDate };
      return newObject;
    });
    const paginationData = paginationCalculator(
      momentCalc,
      PageNumber,
      RowsOfPage
    );
    setFullData(paginationData);
    setSearchData(paginationData);
  };

  useEffect(() => {
    if (courseData) {
    //   console.log("mentorListData ==>", mentorListData);
      changePaginationAndMoment();
    }
  }, [courseData, PageNumber, RowsOfPage]);

  const searchHadnler = (searchValue) => {
    const filteredData = searchData.filter(
      (item) => item.courseName.indexOf(searchValue) !== -1
    );
    setFullData(filteredData);
  };

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
        <InputGroupButtons
          onChange={(searchValue) => searchHadnler(searchValue.target.value)}
        />
        {fullData && (
          <Export
            headers={headerData}
            dataMap={fullData}
            titleField="assistanceName"
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
        )}
        <SeparatedPagination
          totalCount={courseData?.length}
          RowsOfPage={RowsOfPage}
          changePageNumber={(pageNumber) => setPageNumber(pageNumber)}
        />
      </ModalBody>
    </Modal>
  );
};

export default MentorPageModal;
