import { useParams } from "react-router-dom";
import { getMentorListData } from "../../../../@core/services/api";
import { useEffect, useState } from "react";
import Export from "../../../../@core/components/common/Export/Export";
import {
  addedDataToObject,
  ChangeMoment,
  paginationCalculator,
} from "../../../../@core/hooks";
import { Card } from "reactstrap";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";

const CourseMentorList = () => {
  const { CourseId } = useParams();
  const [mentorList, setMentorList] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(10);

  const headerData = ["آیدی", "نام منتور", "ایمیل", "تاریخ ایجاد", ""];

  const { data, isLoading } = getMentorListData(
    "getMentorListData",
    "/CourseAssistance"
  );

  useEffect(() => {
    setMentorList(null);
  }, [isLoading]);

  if (!isLoading) {
    console.log("mentor data list ==>", data);
    if (!mentorList) {
      setMentorList(data);
    }
  }

  const filterDataHadnler = () => {
    const filtered = mentorList.filter((item) => item.courseId === CourseId);
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (mentorList) {
      filterDataHadnler();
    }
  }, [mentorList]);

  // change pagination
  const changePaginationHandler = () => {
    const changeMoment = addedDataToObject(filteredData, (item) => {
      const inserDate = ChangeMoment(item.inserDate, "YYYY/MM/DD", "persian");
      const newData = { ...item, inserDate };
      return newData;
    });
    const pagination = paginationCalculator(
      changeMoment,
      pageNumber,
      rowsOfPage
    );
    setFullData(pagination);
  };
  console.log("fullData ===>", fullData);

  useEffect(() => {
    if (filteredData) {
      changePaginationHandler();
    }
  }, [filteredData, pageNumber, rowsOfPage]);

  return (
    <>
      <Card>
        {fullData && (
          <Export
            hover={true}
            headers={headerData}
            dataMap={fullData}
            titleField="userId"
            fieldKeys={["assistanceName", "gmail", "inserDate"]}
            btnKeys={{ flag: false }}
          />
        )}
      </Card>
      <SeparatedPagination
        RowsOfPage={rowsOfPage}
        totalCount={filteredData?.length}
        changePageNumber={(pageNum) => setPageNumber(pageNum)}
      />
    </>
  );
};

export default CourseMentorList;
