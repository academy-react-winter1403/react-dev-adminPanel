import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomPagination } from "../../../@core/components/common";
import { ChevronDown } from "react-feather";
import userPhotos from "../../../@core/assets/photos/01.jpg"
import { CareerRecordsColumns } from "../../../@core/components/constant/user/CareerRecordsColumns";
import { Card, CardBody, CardHeader } from "reactstrap";

const CareerRecords = () => {
  const [searchValue, setSearchValue] = useState("");

  const changeSearchHandler = (inputValue) => {
    setSearchValue(inputValue);
  };

  const tabNames = [
    "کاربر",
    "نام شغل",
    "درباره شغل",
    "تاریخ شروع / پایان",
    "شرکت",
    "نمایش",
    "وضعیت کار",
    "اقدام",
  ]

  return (
    <table className="w-100">
      <thead className="w-100">
        <Card className="w-100">
          <CardHeader className="w-100 py-1 m-0 flex flex-row justify-content-between">
            {
              tabNames.map((item, index) => (
                <label key={index}>{item}</label>
              ))
            }
          </CardHeader>
        </Card>
      </thead>
      <tbody>
          <td></td>
      </tbody>
    </table>
  );
};

export default CareerRecords;
