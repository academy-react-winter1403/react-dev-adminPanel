import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomPagination } from "../../../@core/components/common";
import { ChevronDown } from "react-feather";
import userPhotos from "../../../@core/assets/photos/01.jpg"
import { CareerRecordsColumns } from "../../../@core/components/constant/user/CareerRecordsColumns";

const CareerRecords = () => {
  const [searchValue, setSearchValue] = useState("");

  const changeSearchHandler = (inputValue) => {
    setSearchValue(inputValue);
  };

  const dataToRender = () => {
    const users = [
      {
        id: 1,
        fullName: "sjvnjksfv",
        avatar: userPhotos,
        rol: "acsv",
        plan: "sfvsfv",
      },
      {
        id: 2,
        fullName: "sjvnjksfv",
        avatar: userPhotos,
        rol: "acsv",
        plan: "sfvsfv",
      },
      {
        id: 3,
        fullName: "sjvnjksfv",
        avatar: userPhotos,
        rol: "acsv",
        plan: "sfvsfv",
      },
      {
        id: 4,
        fullName: "sjvnjksfv",
        avatar: userPhotos,
        rol: "acsv",
        plan: "sfvsfv",
      },
      {
        id: 5,
        fullName: "sjvnjksfv",
        avatar: userPhotos,
        rol: "acsv",
        plan: "sfvsfv",
      },
    ];
    return users;
  };

  return (
    <DataTable
      noHeader
      subHeader
      sortServer
      pagination
      responsive
      paginationServer
      columns={CareerRecordsColumns}
      //   onSort={handleSort}
      sortIcon={<ChevronDown />}
      className="react-dataTable"
      paginationComponent={CustomPagination}
      data={dataToRender()}
      //   subHeaderComponent={
      //     <CustomHeader
      //       //   store={store}
      //       inputValue={searchValue}
      //       searchTerm={searchValue}
      //       changeSearchHandler={changeSearchHandler}
      //       //   rowsPerPage={rowsPerPage}
      //       //   handleFilter={handleFilter}
      //       //   handlePerPage={handlePerPage}
      //       toggleSidebar={toggleSidebar}
      //     />
      //   }
    />
  );
};

export default CareerRecords;
