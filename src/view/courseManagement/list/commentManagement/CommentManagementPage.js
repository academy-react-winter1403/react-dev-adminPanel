import { useEffect, useState } from "react";
import TableFilter from "../../../../@core/components/common/Filter/TableFilter";
import { Card, Row } from "reactstrap";
import FilterSection from "./FilterSection";
import UserTable from "../../../user/list/UserTable";
import Export from "../../../../@core/components/common/Export/Export";
import {
  acceptComment,
  deleteComment,
  getCourseAllComment,
  postReplayToComment,
  rejectComment,
} from "../../../../@core/services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataToCommentManagementReplayState,
  addDataToCommentManagementState,
  changeAllCourseCommentManagementPageNumber,
  changeAllCourseCommentManagementQuery,
  changeAllCourseCommentManagementRowsOfPage,
} from "../../store/actions";
import ButtonAction from "../../../../@core/components/common/ButtonAction/ButtonAction";
import {
  Check,
  CheckCircle,
  Navigation,
  PlusCircle,
  PlusSquare,
  Trash2,
} from "react-feather";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import toast from "react-hot-toast";
import { getCommentReplaySingel } from "../../../../@core/services/api/get-api/getCommentReplaySingel";
import ReplayModal from "./ReplayModal";
import AddReplayFormModal from "./AddReplayFormModal";

const CommentManagementPage = () => {
  const dispatch = useDispatch();
  const {
    commentManagement,
    PageNumber,
    RowsOfPage,
    Query,
    SortingCol,
    Accept,
    SortingType,
  } = useSelector((state) => state.allCourseCommentManagementSlice);
  const [fullData, setFullData] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [replayModalIsOpen, setReplayModalIsOpen] = useState(false);
  const [addReplayFormModalIsOpen, setAddReplayFormModalIsOpen] = useState(false);
  const headerData = [
    "کاربر",
    "عنوان کامنت",
    "توضیحات کامنت",
    "نام دوره",
    "وضعیت",
    // "پاسخ ها",
    "عملیات",
  ];

  const actionData = [
    {
      title: "حذف",
      icon: <Trash2 size={14} />,
      color: "success",
    },
    {
      title: "لغو تایید",
      icon: <PlusSquare size={14} />,

      color: "success",
    },
    {
      title: "پاسخ ها",
      icon: <Navigation size={14} />,
      color: "success",
    },
    {
      title: "مشاهده ریپلای ها",
      icon: <CheckCircle size={14} />,
      color: "success",
    },
  ];
  const actionData2 = [
    {
      title: "حذف",
      icon: <Trash2 size={14} />,
      color: "success",
    },
    {
      title: "تایید کامنت",
      icon: <CheckCircle size={14} />,
      color: "success",
    },
    {
      title: "مشاهده ریپلای ها",
      icon: <CheckCircle size={14} />,
      color: "success",
    },
  ];

  const {
    data: commentData,
    isLoading,
    isError,
    refetch: refetchGetCommentData,
  } = getCourseAllComment("getCourseAllComment", "/Course/CommentManagment", {
    PageNumber,
    RowsOfPage,
    Accept,
    Query,
    SortingCol,
    SortingType,
  });

  if (!isLoading) {
    console.log("commentData ==>", commentData);
    dispatch(addDataToCommentManagementState(commentData.comments));
    if (!fullData) {
      setFullData(commentData.comments);
    }
  }

  // get comment replay singel
  const {
    data: commentReplayData,
    isLoading: commentReplayLoading,
    isError: commentReplayError,
    refetch: refetchGetCommentReplayData,
  } = getCommentReplaySingel(
    "getCommentReplaySingel",
    `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`,
    courseId && commentId ? true : false
  );

  if (!commentReplayLoading) {
    console.log("commentReplayData ==>", commentReplayData);
    dispatch(addDataToCommentManagementReplayState(commentReplayData));
  }

  useEffect(() => {
    if (commentId && courseId) {
      refetchGetCommentReplayData();
    }
  }, [commentId, courseId]);

  useEffect(() => {
    refetchGetCommentData();
  }, [PageNumber, RowsOfPage, Query, SortingCol, SortingType, Accept]);

  const { mutate: acceptCommentMutate } = acceptComment("acceptComment");
  const { mutate: rejectCommentMutate } = rejectComment("rejectComment");
  const { mutate: deleteCommentMutate } = deleteComment("deleteComment");
  const actionClickHdnler = (item) => {
    console.log("value ==>", item);
    if (item.title === "تایید کامنت") {
      acceptCommentMutate(
        ["/Course/AcceptCourseComment", { CommentCourseId: commentId }],
        {
          onSuccess: (data) => {
            toast.success(data.message);
            refetchGetCommentData();
          },
        }
      );
    }
    if (item.title === "لغو تایید") {
      rejectCommentMutate(
        ["/Course/RejectCourseComment", { CommentCourseId: commentId }],
        {
          onSuccess: (data) => {
            toast.success(data.message);
            refetchGetCommentData();
          },
        }
      );
    }
    if (item.title === "حذف") {
      deleteCommentMutate(
        ["/Course/DeleteCourseComment", { CourseCommandId: commentId }],
        {
          onSuccess: (data) => {
            toast.success(data.message);
            refetchGetCommentData();
          },
        }
      );
    }
    if (item.title === "مشاهده ریپلای ها") {
      setReplayModalIsOpen(!replayModalIsOpen);
    }
    if (item.title === "پاسخ ها") {
      setAddReplayFormModalIsOpen(!addReplayFormModalIsOpen);
    }
  };

  const acceptElem = (
    <ButtonAction dataArray={actionData2} itemClickHandle={actionClickHdnler} />
  );
  const acceptElem2 = (
    <ButtonAction dataArray={actionData} itemClickHandle={actionClickHdnler} />
  );

  const getCommentReplayHandler = (item) => {
    console.log("item ==>", item);
    setCourseId(item.courseId);
    setCommentId(item.commentId);
  };

  const cardclickHadnler = (item) => {
    console.log("item ==>", item);
    setCommentId(item.commentId);
  };

  const { mutate: postReplayToCommentMutate } = postReplayToComment("postReplayToComment");
  const addReplayHandler = (values) => {
    const { Title, Describe } = values;
    const data = {
      CommentId: commentId,
      CourseId: courseId,
      Title,
      Describe,
    }
    console.log("data ==>", data);
    postReplayToCommentMutate(["/Course/AddReplyCourseComment", data, "multipart/form-data"], {
      onSuccess: (data) => {
        toast.success(data.message);
        refetchGetCommentData();
        refetchGetCommentReplayData();
        setAddReplayFormModalIsOpen(!addReplayFormModalIsOpen);
      },
    });
  }

  return (
    <Row>
      <FilterSection />
      <Card>
        <UserTable
          inputOptionClick={(value) =>
            dispatch(changeAllCourseCommentManagementRowsOfPage(value.label))
          }
          changeSearchInput={(searchValue) =>
            dispatch(changeAllCourseCommentManagementQuery(searchValue))
          }
        />
        {commentManagement && (
          <Export
            headers={headerData}
            dataMap={commentManagement}
            titleField="userFullName"
            fieldKeys={[
              "commentTitle",
              "describe",
              "courseTitle",
              { keyName: "accept" },
            //   { keyName: "replay" },
            ]}
            statusKey={{
              accept: {
                trueField: "تایید شده",
                falseField: "تایید نشده",
              },
            //   replay: {
            //     trueField: "مشاهده",
            //     falseField: "مشاهده",
            //   },
            }}
            btnKeys={{
              flag: true,
              keyName: "accept",
              trueField: acceptElem2,
              falseField: acceptElem,
            }}
            Btn={<ButtonAction dataArray={actionData} />}
            btnOnClick={cardclickHadnler}
            clickHandle={getCommentReplayHandler}
          />
        )}
      </Card>
      <SeparatedPagination
        RowsOfPage={RowsOfPage}
        totalCount={commentData?.totalCount}
        changePageNumber={(pageNumber) => {
          dispatch(changeAllCourseCommentManagementPageNumber(pageNumber));
        }}
      />
      <ReplayModal
        isOpen={replayModalIsOpen}
        toggle={() => setReplayModalIsOpen(!replayModalIsOpen)}
        refetchGetCommentReplayData={refetchGetCommentReplayData}
      />
      <AddReplayFormModal
        formData={commentData?.comments}
        isOpen={addReplayFormModalIsOpen}
        submitHandle={addReplayHandler}
        toggle={() => setAddReplayFormModalIsOpen(!addReplayFormModalIsOpen)}
      />
    </Row>
  );
};

export default CommentManagementPage;
