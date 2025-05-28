import { Fragment, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock, Link, BookOpen, Table } from "react-feather";
import UserCourseList from "./UserCourseList";
import UserReserveCourse from "./UserReserveCourse";
import UserCoursesListCard from "../list/UserCoursesListCard";
import UserComments from "../list/UserComments";
import { getUserComment } from "../../../@core/services/api/get-api/getUserComment";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserCommnetData,
  changeTotalCount,
} from "../list/users/store/actions";

// Tabs Components
// import UserCourseList from "./UserCourseList";
// import UserReserveCourse from "./UserReserveCourse";
// import MoreInfo from "./MoreInfo";
// import Connections from "./Connections";
// import UserComments from "./UserComments";

const UserTabs = ({ active, toggleTab, userDetails }) => {
  const Tabs = [
    { icon: User, id: "1", title: "دوره ها" },
    { icon: BookOpen, id: "2", title: "دوره های رزرو" },
    { icon: Lock, id: "3", title: "کامنت ها" },
    { icon: Link, id: "4", title: "سایر اطاعات کاربر" },
  ];

  const { userCommentFilterSlice } = useSelector((state) => state);

  const {
    PageNumber,
    RowsOfPage,
    SortingCol,
    SortType,
    Query,
    Accept,
    userId,
  } = userCommentFilterSlice;

  const dispatch = useDispatch();

  const { mutate, data } = getUserComment("userComment");

  return (
    <Fragment>
      <Nav pills className="mb-2">
        {Tabs.map((item) => (
          <NavItem key={item.id}>
            <NavLink
              active={active === item.id}
              onClick={() => {
                toggleTab(item.id);
                console.log(item);
                if (item.id === "3") {
                  mutate(
                    [
                      "/Course/CommentManagment",
                      {
                        PageNumber,
                        RowsOfPage,
                        SortingCol,
                        SortType,
                        Query,
                        Accept,
                        userId,
                      },
                    ],
                    {
                      onSuccess: (data) => {
                        console.log("comment data ==>", data);
                        dispatch(addUserCommnetData(data.comments));
                        dispatch(changeTotalCount(data.totalCount));
                      },
                    }
                  );
                }
              }}
              className="px-1"
            >
              <item.icon className="font-medium-3 me-50" />
              <span className="fw-bold">{item.title}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          {/* <UserCourseList /> */}
          <UserCoursesListCard />
        </TabPane>
        <TabPane tabId="2">
          <UserReserveCourse />
        </TabPane>
        <TabPane tabId="3">
          <UserComments />
        </TabPane>
        <TabPane tabId="4" className="mb-4">
          {/* <MoreInfo /> */}
          {/* <Connections /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default UserTabs;
