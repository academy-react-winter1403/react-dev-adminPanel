import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { CustomPagination } from "../../../@core/components/common";
import CreateNewUser from "../create";
import UserTable from "./UserTable";
import UserCard from "./UserCard";
import {
  deleteUser,
  getUserListDataWithParams,
  getUserListDataByAction,
} from "../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner";
import {
  addUserListTotalCount,
  changeAddFlag,
  changeUserFilterPageNumber,
  changeUserIdtUCF,
  firstAddDataToUserList,
} from "./users/store/actions";
import { useQueryClient } from "react-query";
import { http } from "../../../@core/services/interceptor";
import { updateSearchParamsHook } from "../../../@core/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
const UserListWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // console.log("state ==>", state);

  // stata distractior
  const { userListSlice, userFilterSlice } = state;
  const { userList, addFlag } = userListSlice;

  // const { params } = userFilterSlice;
  const {
    IsActiveUser,
    IsDeletedUser,
    PageNumber,
    Query,
    RowsOfPage,
    SortType,
    SortingCol,
    roleId,
  } = userFilterSlice;
  console.log(userFilterSlice);
  // stata distractior

  const createNewUserHandler = () => setSidebarOpen(!sidebarOpen);
  const { data, isLoading, refetch } = getUserListDataWithParams(
    "getUserList",
    "/User/UserMannage",
    {
      PageNumber,
      RowsOfPage,
      Query,
      SortType,
      SortingCol,
      IsActiveUser,
      IsDeletedUser,
      roleId,
    }
  );

  if (!isLoading) {
    console.log("user list data...", data);
    // if (addFlag) {
      dispatch(firstAddDataToUserList(data.listUser));
      dispatch(addUserListTotalCount(data.totalCount))
    // }
    dispatch(changeAddFlag(false));
  }

  const changePaginationHandler = (pageNum) => {
    console.log(pageNum);
    updateSearchParamsHook(
      setSearchParams,
      "PageNumber",
      pageNum.selected,
      dispatch,
      changeUserFilterPageNumber
    );
  };

  // card click handler
  const cardClickHandler = (item) => {
    console.log(item);
    dispatch(changeUserIdtUCF(item.id));
    navigate(`/user/view/${item.id}`);
  };
  // card click handler

  // const { mutate } = getUserListDataByAction("getUserList");

  useEffect(() => {
    // mutate(
    //   [
    //     "/User/UserMannage",
    //     {
    //       IsActiveUser,
    //       IsDeletedUser,
    //       PageNumber,
    //       Query,
    //       RowsOfPage,
    //       SortType,
    //       SortingCol,
    //       roleId,
    //     },
    //   ],
    //   {
    //     onSuccess: (data) => {
    //       console.log("data ==>", data);
    //       dispatch(firstAddDataToUserList(data.listUser));
    //     },
    //   }
    // );
    // queryClient.invalidateQueries(["getUserList"])
    refetch();
  }, [
    IsActiveUser,
    IsDeletedUser,
    PageNumber,
    Query,
    RowsOfPage,
    SortType,
    SortingCol,
    roleId,
  ]);

  // if (!userList) return <SpinnerComponent />;

  const {mutate} = deleteUser("deleteUser")
  const userDeleteHandler = (item) => {
    console.log(item)
    const dataObj = {
      userId: item.id
    }
    mutate([`/User/DeleteUser`, dataObj], {
      onSuccess: (data) => {
        console.log(data)
      }
    })
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="react-dataTable">
        <UserTable createNewUserHandler={createNewUserHandler} />
        <table className="flex flex-row table table-hover">
          <tbody>
            {isLoading ? (
              <SpinnerComponent />
            ) : (
              userList?.map((item, index) => {
                return (
                  <UserCard
                    key={index}
                    userName={item.fname}
                    emailAddress={item.gmail}
                    profileNum={item.profileCompletionPercentage}
                    status={item.active}
                    picAddress={item.pictureAddress}
                    cardClick={() => cardClickHandler(item)}
                    handleDelete={() => userDeleteHandler(item)}
                    id={item.id}
                    navigationName={"/user/view/"}
                  >
                    <Row className="flex flex-row">
                      {item.userRoles?.includes("Teacher") !== false && (
                        <Col className="m-0 p-0" md="12">
                          استاد
                        </Col>
                      )}
                      {item.userRoles?.includes("Student") !== false && (
                        <Col className="m-0 p-0" md="12">
                          دانشجو
                        </Col>
                      )}
                      {item.userRoles?.includes("Administrator") !== false && (
                        <Col className="m-0 p-0" md="12">
                          ادمین
                        </Col>
                      )}
                    </Row>
                  </UserCard>
                );
              })
            )}
            {/* {userList?.map((item, index) => {
              return (
                <UserCard
                  key={index}
                  userName={item.fname}
                  emailAddress={item.gmail}
                  profileNum={item.profileCompletionPercentage}
                  status={item.active}
                  picAddress={item.pictureAddress}
                  cardClick={() => cardClickHandler(item)}
                >
                  <Row className="flex flex-row">
                    {item.userRoles?.includes("Teacher") !== false && (
                      <Col className="m-0 p-0" md="12">
                        استاد
                      </Col>
                    )}
                    {item.userRoles?.includes("Student") !== false && (
                      <Col className="m-0 p-0" md="12">
                        دانشجو
                      </Col>
                    )}
                    {item.userRoles?.includes("Administrator") !== false && (
                      <Col className="m-0 p-0" md="12">
                        ادمین
                      </Col>
                    )}
                  </Row>
                </UserCard>
              );
            })} */}
          </tbody>
        </table>
        <CreateNewUser
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          setSidebarOpen={setSidebarOpen}
        />

        <Row className="w-100 flex justify-content-center">
          {/* <CustomPagination /> */}
          <CustomPagination
            total={data?.totalCount}
            current={userFilterSlice.PageNumber}
            rowsPerPage={userFilterSlice.RowsOfPage}
            handleClickFunc={changePaginationHandler}
          />
        </Row>
      </div>
    </Card>
  );
};

export default UserListWrapper;
