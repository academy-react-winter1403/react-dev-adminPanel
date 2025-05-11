import React, { useState } from "react";
import { columns } from "../../../@core/components/constant/user/columns";
import { Card } from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import CustomHeader from "./CustomeHeader";
import { CustomPagination } from "../../../@core/components/common";
import userPhotos from "../../../@core/assets/photos/01.jpg"
import CreateNewUser from "../create";

const UserListWrapper = () => {
  const [searchValue, setSearchValue] = useState("");

  const changeSearchHandler = (value) => {
    setSearchValue(value);
    console.log(value);
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Card className="overflow-hidden">
      <div className="react-dataTable">
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          //   onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              //   store={store}
              inputValue={searchValue}
              searchTerm={searchValue}
              changeSearchHandler={changeSearchHandler}
              //   rowsPerPage={rowsPerPage}
              //   handleFilter={handleFilter}
              //   handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
            />
          }
        />
        <CreateNewUser
            open={sidebarOpen}
            toggleSidebar={toggleSidebar}
            setSidebarOpen={setSidebarOpen}
        />
      </div>
    </Card>
  );
};

export default UserListWrapper;
