import React, { useEffect, useState } from "react";
import UserTable from "../../user/list/UserTable";
import Export from "../../../@core/components/common/Export/Export";
import {
  createTechnologi,
  getTechnologiData,
  updateTechnologi,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import { addDataToTechnologiState } from "../store/actions";
import { FileText } from "react-feather";
import { paginationCalculator } from "../../../@core/hooks";
import SeparatedPagination from "../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import { Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, UserX } from "react-feather";
import { CreateTechnologi } from "./CreateTechnologi";
import toast from "react-hot-toast";

const CourseTechnologiManager = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { technologiDataSlice } = state;
  const { technologiData, tehcnologiSingelData } = technologiDataSlice;
  const headerData = ["نام سطح", "توضیحات سطح", "اقدام"];
  const [fullData, setFullData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(6);
  const [modalFlag, setModalFlag] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [formBtnTextContent, setFormBtnTextContent] = useState("");

  const userReport = {
    title: "مجموع تکنولوژی ها ",
    color: "primary",
    stats: technologiData ? technologiData.length : "",
    icon: User,
  };

  const { data, isLoading, refetch } = getTechnologiData(
    "getTechnologiData",
    "/Technology"
  );

  if (!isLoading) {
    console.log("technologi data ==>", data);
    dispatch(addDataToTechnologiState(data));
    // if (!searchData) {
    //     setSearchData(data)
    // }
  }

  // change pagination
  const chanegPagination = () => {
    const paginationData = paginationCalculator(
      technologiData,
      pageNumber,
      rowsOfPage
    );
    setFullData(paginationData);
    setSearchData(paginationData);
  };

  useEffect(() => {
    if (technologiData) {
      chanegPagination();
    }
  }, [technologiData, rowsOfPage, pageNumber]);

  // handle search
  const searchHandler = (searchValue) => {
    const filteredData = searchData.filter(
      (el) => el.techName.indexOf(searchValue) !== -1
    );
    setFullData(filteredData);
  };

  console.log(technologiData);

  const editeElem = (
    <div>
      <FileText size={14} />
      <span> وبرایش </span>
    </div>
  );

  const { mutate: updateTechnologiMutate } =
    updateTechnologi("updateTechnologi");
  const { mutate: createTechnologiMutate } = createTechnologi("create");
  const formSubmitHandler = (fromValue) => {
    if (formBtnTextContent === "ساختن") {
      createTechnologiMutate(["/Technology", fromValue, "application/json"], {
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
      updateTechnologiMutate(["/Technology", fromValue], {
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
          btnContentText={"افزودن تکنولوژی"}
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
            fieldKeys={["techName", "describe"]}
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
          totalCount={technologiData?.length}
          RowsOfPage={rowsOfPage}
          changePageNumber={(pageNum) => setPageNumber(pageNum)}
        />
        {/* {categoryDetail && ( */}
        <CreateTechnologi
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

export default CourseTechnologiManager;
