import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import HeadLabelComp from "./HeadLabelComp";
import {
  CustomPagination,
  InputCostume,
} from "../../../@core/components/common";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserCommnetData,
  changeAcceptUCF,
  changePageNumberUCF,
  changeQueryUCF,
  changeSortTypeUCF,
  changeTotalCount,
} from "./users/store/actions";
import { CoursesRowCard } from "./CoursesRowCard";
import InputGroupButtons from "../../../@core/components/common/InputGroupButtons/InputGroupButtons";
import { useQueryClient } from "react-query";
import { FileText, MoreVertical, Trash } from "react-feather";
import {
  deleteComment,
  getUserComment,
  postAcceptComment,
  postRejectedComment,
} from "../../../@core/services/api";
import toast from "react-hot-toast";
import { paginationCalculator } from "../../../@core/hooks/pagination-calculator/paginationCalculator";

const UserComments = () => {
  // input select data
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState({
    value: "",
    label: "کامنت های تایید شده",
  });
  const inputOption = [
    { value: "", label: "کامنت های تایید شده" },
    { value: "", label: "کامنت های تایید نشده" },
  ];

  const [inputSortValue, setInputSortValue] = useState({
    value: "",
    label: "آخرین آپدیت",
  });
  const inputSortOption = [
    { value: "", label: "آخرین آپدیت" },
    { value: "", label: "بیشترین لایک" },
  ];
  // input select data

  // get data flag
  const [getDataFlag, setGetDataFlag] = useState(true);
  // get data flag

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { userCommentFilterSlice } = state;
  const { userCommentSlice } = state;
  const { userComment, totalCount } = userCommentSlice;
  // console.log(userComment);

  const {
    PageNumber,
    RowsOfPage,
    SortingCol,
    SortType,
    Query,
    Accept,
    userId,
  } = userCommentFilterSlice;

  const changeHandler = (value) => {
    setInputValue({ ...inputValue, label: value.label });
    console.log(value);
    if (value.label === "کامنت های تایید شده") {
      dispatch(changeAcceptUCF(true));
    } else {
      dispatch(changeAcceptUCF(false));
    }
  };

  const inputSortChangeHandler = (value) => {
    setInputSortValue({ ...inputSortValue, label: value.label });
    console.log(value);
    if (value.label === "بیشترین لایک") {
      dispatch(changeSortTypeUCF("Active"));
    } else {
      dispatch(changeSortTypeUCF("InsertDate"));
    }
  };

  const {
    data: commentData,
    isLoading,
    refetch: getCommentRefetch,
  } = getUserComment("userComment", "/Course/CommentManagment", {
    PageNumber,
    RowsOfPage,
    SortingCol,
    SortType,
    Query,
    Accept,
    userId,
  });

  if (!isLoading) {
    console.log("commentData ==>", commentData);
    dispatch(addUserCommnetData(commentData.comments));
    dispatch(changeTotalCount(commentData.totalCount));
  }

  const changePaginationHandler = (item) => {
    // console.log(item);
    dispatch(changePageNumberUCF(item.selected));
  };

  // input search change hamndler
  const inputSearchChangeHadnler = (value) => {
    // console.log(value.target.value);
    dispatch(changeQueryUCF(value.target.value));
  };

  // accept comment
  const { mutate: acceptCommentMutate } = postAcceptComment("acceptComment");
  const acceptCommentClickHandler = (item) => {
    console.log(item);
    const dataObj = {
      accept: true,
    };
    acceptCommentMutate(
      [
        `/Course/AcceptCourseComment`,
        dataObj,
        {
          CommentCourseId: item.commentId,
        },
      ],
      {
        onSuccess: (data) => {
          toast.success(data.message);
          getCommentRefetch();
        },
      }
    );
  };

  const { mutate: rejectedCommentMutate } =
    postRejectedComment("rejectedComment");
  const rejectedCommentClickHandler = (item) => {
    const dataObj = {
      CommentCourseId: item.commentId,
    };
    rejectedCommentMutate(["/Course/RejectCourseComment", dataObj], {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };
  // accept comment

  // pagination
  // const paginationNum = paginationCalculator(commentData, RowsOfPage, PageNumber)
  // console.log("paginationNum ==>", paginationNum)

  // delete comment handle
  const {mutate: deleteCommentMutate} = deleteComment("deleteComment")
  const deleteCommentHandler = (item) => {
    console.log(item)
    const dataObj = {
      CourseCommandId: item.commentId
    }
    deleteCommentMutate(["/Course/DeleteCourseComment", dataObj], {
      onSuccess: (data) => {
        console.log(data)
      }
    })
  }

  // get comment data with dependensis
  useEffect(() => {
    getCommentRefetch();
    console.log("SortType ==>", SortType)
  }, [PageNumber, RowsOfPage, SortingCol, SortType, Query, Accept, userId]);
  // get comment data with dependensis

  return (
    <>
      <div
        className="w-100"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label className="divider-text fs-2">
          {inputValue.label === "انتخاب کنید"
            ? "کامنت های تایید شده"
            : inputValue.label}
        </label>
        <hr
          style={{
            width: "78%",
            height: "1px",
            outline: "none",
            border: "none",
            background: "rgb(66, 66, 66)",
            marginRight: "8px",
          }}
        />
      </div>
      <div
        className="filterBox-control w-100 mt-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <label> فیلتر بر اساس : </label>
          <InputCostume
            option={inputOption}
            value={inputValue}
            onChange={changeHandler}
          />
        </div>
        <div
          className="select-input-control"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <label> فیلتر براساس : </label>
          <InputCostume
            option={inputSortOption}
            value={inputSortValue}
            onChange={inputSortChangeHandler}
          />
        </div>

        <div
          className="input-search-control w-50"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {/* <Input placeholder="جست و جو کن😍😍" /> */}
          <label> جست و جو : </label>
          <InputGroupButtons
            placeholder={"جست و جو"}
            onChange={inputSearchChangeHadnler}
          />
        </div>
      </div>
      <Card className="m-0 p-0 mt-2">
        <CardHeader className="m-0 p-0">
          <HeadLabelComp>
            <th
              className="w-50"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <label>عنوان کامنت</label>
            </th>
            <th
              className="w-50"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "100px",
              }}
            >
              <label>متن کامنت</label>
              <label>وضعیت</label>
              <label>افدام</label>
            </th>
          </HeadLabelComp>
        </CardHeader>
        <CardBody>
          {userComment
            ? userComment.map((item, index) => {
                return (
                  <CoursesRowCard
                    key={index}
                    courseName={item.commentTitle}
                    courseDescription={item.describe}
                    courseLastDate={
                      <Badge
                        className={`badge ${
                          item.accept ? "bg-light-danger" : ""
                        }`}
                      >
                        {item.accept ? "تایید شده" : "تایید نشده"}
                      </Badge>
                    }
                    action={
                      <UncontrolledDropdown direction="start">
                        <DropdownToggle
                          className="icon-btn hide-arrow"
                          color="transparent"
                          size="sm"
                          caret
                        >
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu className="d-flex flex-column p-0">
                          <DropdownItem
                            href="/"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/users/view/" + item.id);
                            }}
                          >
                            <FileText className="me-50" size={15} />{" "}
                            <span className="align-middle">ریپلای ها</span>
                          </DropdownItem>
                          {!item.accept ? (
                            <DropdownItem
                              onClick={() => {
                                acceptCommentClickHandler(item);
                              }}
                            >
                              <span className="align-middle">تایید</span>
                            </DropdownItem>
                          ) : (
                            <DropdownItem
                              onClick={() => {
                                rejectedCommentClickHandler(item);
                              }}
                            >
                              <span className="align-middle">لغو تایید</span>
                            </DropdownItem>
                          )}
                          <DropdownItem
                            onClick={() => {
                              deleteCommentHandler(item);
                            }}
                          >
                            <Trash className="me-50" size={15} />{" "}
                            <span className="align-middle">حذف</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    }
                  />
                );
              })
            : null}
        </CardBody>
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CustomPagination
          total={commentData?.totalCount}
          current={PageNumber}
          rowsPerPage={RowsOfPage}
          handleClickFunc={changePaginationHandler}
        />
      </div>
    </>
  );
};

export default UserComments;
