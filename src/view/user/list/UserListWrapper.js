import React, { useEffect, useState } from "react";
import { columns } from "../../../@core/components/constant/user/columns";
import { Card, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import CustomHeader from "./CustomeHeader";
import { CustomPagination } from "../../../@core/components/common";
import userPhotos from "../../../@core/assets/photos/01.jpg";
import CreateNewUser from "../create";
import UserTable from "./UserTable";
import UserCard from "./UserCard";
import { getData, getUserListData } from "../../../@core/services/api";
import axios from "axios";
import { useSelector } from "react-redux";
const UserListWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const state = useSelector(state => state)

  console.log(state)

  const createNewUserHandler = () => setSidebarOpen(!sidebarOpen);

  const roleId = localStorage.getItem("id")
  const token = localStorage.getItem("token")

  console.log(token)

  const {data, isLoading} = getUserListData("userLists", "/User/UserMannage")
  
  if (!isLoading) console.log("user list data...", data)

  useEffect(() => {

  }, [])

  return (
    <Card className="overflow-hidden p-0">
      <div className="react-dataTable">
        <UserTable createNewUserHandler={createNewUserHandler} />
        <table className="flex flex-row table table-hover">
          <tbody>
            <UserCard />
          </tbody>
        </table>
        <CreateNewUser
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          setSidebarOpen={setSidebarOpen}
        />

        <Row className="w-100 flex justify-content-center">
          <CustomPagination />
        </Row>
      </div>
    </Card>
  );
};

export default UserListWrapper;
