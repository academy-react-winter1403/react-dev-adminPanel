import React, { useEffect, useState } from "react";
import UserTable from "../../user/list/UserTable";
import Export from "../../../@core/components/common/Export/Export";
import {
    createLevelPost,
    createStatusPost,
  getLevelData,
  getStatusData,
  updateLevel,
  updateStatus,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import { addDataToLevelState, addDataToStatusState } from "../store/actions";
import { FileText } from "react-feather";
import { paginationCalculator } from "../../../@core/hooks";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import { Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, UserX } from "react-feather";
import toast from "react-hot-toast";
import CreateStatus from "./CreateStatus";
import CreateLevel from "./CreateLevel";

const CourseLevelManager = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { levelDataSlice } = state;
  const { levelData, statusSingelData } = levelDataSlice;
  const [fullData, setFullData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(6);
  const [modalFlag, setModalFlag] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [formBtnTextContent, setFormBtnTextContent] = useState("");
  const headerData = ["نام وضعیت", "توضیحات وضعیت", "اقدام"];

  const userReport = {
    title: "مجموع سطح های دوره",
    color: "primary",
    stats: levelData ? levelData.length : "",
    icon: User,
  };

  const { data, isLoading, refetch } = getLevelData(
    "getLevelData",
    "/CourseLevel/GetAllCourseLevel"
  );

  if (!isLoading) {
    console.log("status data ==>", data);
    dispatch(addDataToLevelState(data));
    // if (!searchData) {
    //     setSearchData(data)
    // }
  }

  // change pagination
  const chanegPagination = () => {
    const paginationData = paginationCalculator(
      levelData,
      pageNumber,
      rowsOfPage
    );
    setFullData(paginationData);
    setSearchData(paginationData);
  };

  useEffect(() => {
    if (levelData) {
      chanegPagination();
    }
  }, [levelData, rowsOfPage, pageNumber]);

  // handle search
  const searchHandler = (searchValue) => {
    const filteredData = searchData.filter(
      (el) => el.levelName.indexOf(searchValue) !== -1
    );
    setFullData(filteredData);
  };

  console.log(fullData);

  const editeElem = (
    <div>
      <FileText size={14} />
      <span> وبرایش </span>
    </div>
  );

  const { mutate: updateLevelMutate } =
    updateLevel("updateLevel");
  const { mutate: createLevelPostMutate } = createLevelPost("createLevelPost");
  const formSubmitHandler = (fromValue) => {
    if (formBtnTextContent === "ساختن") {
      createLevelPostMutate(["/CourseLevel", fromValue], {
        onSuccess: (data) => {
          toast.success(data.message);
          refetch();
          setModalFlag(!modalFlag);
          // setCategoryDetail(null)
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      fromValue = { ...fromValue, id: categoryDetail.id };
      updateLevelMutate(["/CourseLevel", fromValue], {
        onSuccess: (data) => {
          toast.success(data.message);
          refetch();
          setModalFlag(!modalFlag);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <div
      className="course-technologi-manager-container w-100"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div className="right" style={{ width: "27%" }}>
        <Col>
          <StatsHorizontal
            color={userReport.color}
            statTitle={userReport.title}
            icon={<userReport.icon size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{userReport.stats}</h3>
            }
          />
        </Col>
      </div>
      <div className="left" style={{ width: "70%" }}>
        <UserTable
          createNewUserHandler={""}
          btnContentText={"افزودن سطح دوره"}
          changeSearchInput={searchHandler}
          inputOptionClick={(inputValue) => setRowsOfPage(inputValue.label)}
          addBtnClick={() => {
            setCategoryDetail(null);
            setModalFlag(!modalFlag);
            setFormBtnTextContent("ساختن");
          }}
          secondBtnTextContent={false}
          secondBtnClick={() => {}}
        />
        {fullData && (
          <Export
            headers={headerData}
            dataMap={fullData}
            hasImage={"iconAddress"}
            fieldKeys={["levelName", "levelName"]}
            Btn={editeElem}
            hover={true}
            btnOnClick={(item) => {
              console.log(item);
              setCategoryDetail(item);
              setModalFlag(!modalFlag);
              setFormBtnTextContent("تایید");
            }}
          />
        )}
        <SeparatedPagination
          totalCount={levelData?.length}
          RowsOfPage={rowsOfPage}
          changePageNumber={(pageNum) => setPageNumber(pageNum)}
        />
        {/* {categoryDetail && ( */}
        <CreateLevel
          showModal={modalFlag}
          setShowModal={() => setModalFlag(!modalFlag)}
          categoryDetails={categoryDetail}
          variantState={"update"}
          formSubmit={formSubmitHandler}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default CourseLevelManager;
