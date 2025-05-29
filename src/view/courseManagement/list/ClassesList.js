import { Card, Col, Row } from "reactstrap";
import UserCard from "../../user/list/UserCard";
import UserTable from "../../user/list/UserTable";
import { useEffect, useState } from "react";
import Export from "../../../@core/components/common/Export/Export";
import { getClasseListData } from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import { addClassesListData } from "../store/actions";
import { addedDataToObject, ChangeMoment } from "../../../@core/hooks";

const ClassesList = () => {
  const dispatch = useDispatch();
  const [openFlag, setOpenFlag] = useState(false);
  const [date, setDate] = useState(null);
  const [fullData, setFullData] = useState(null);
  const state = useSelector((state) => state);
  const { classesListSlice } = state;
  const { classesList } = classesListSlice;

  console.log("classesList ==>", classesList);
  console.log("fullData ==>", fullData);

  const createNewUserHandler = () => setOpenFlag(!openFlag);

  const headerData = [
    "آیدی",
    "نام کلاس",
    "ظرفیت",
    "نام ساختمان",
    "تاریخ ایجاد",
    "اقدام",
  ];

//   const addedDataToObject = (data, colbackfunction) => {
//     let dataFull = []
//     let dataObj = null
//     let returnData = null
//     data.forEach((elem) => {
//         returnData = colbackfunction(elem)
//         dataObj = {...elem, addedData: returnData}
//         dataFull.push(dataObj)
//     })
//     return dataFull
//   };

  const changeDate = () => {


    const resultData = addedDataToObject(classesList, (item) => {
        const insertDate = ChangeMoment(item.insertDate, "YYYY/MM/DD", "persian");
        const newField = {...item, insertDate}
        return newField
    })

    console.log(resultData)

    if (!fullData) {
      setFullData(resultData);
      console.log("fullData ==>", fullData)
    }
  };

  useEffect(() => {
    if (classesList) {
      changeDate();
      //   changeDate2()
    }
  }, [classesList]);

  return (
    <div>
      <Card>
        <Col>
          <UserTable
            createNewUserHandler={createNewUserHandler}
            btnContentText={"افزودن کلاس"}
          />
        </Col>
        <Col>
          {fullData && (
            <Export
              headers={headerData}
              dataMap={fullData}
              hasImage={false}
              titleField="buildingName"
              fieldKeys={["classRoomName", "capacity", "buildingName", "insertDate"]}
            />
          )}
        </Col>
      </Card>
    </div>
  );
};

export default ClassesList;
