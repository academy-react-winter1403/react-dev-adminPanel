import { useParams } from "react-router-dom";
import Export from "../../../@core/components/common/Export/Export";
import { useEffect, useState } from "react";
import {
  acceptComment,
  deleteComment,
  getCourseCommentSingel,
  rejectComment,
} from "../../../@core/services/api";
import { paginationCalculator } from "../../../@core/hooks";
import { CheckCircle, Navigation, PlusSquare, Trash2 } from "react-feather";
import ButtonAction from "../../../@core/components/common/ButtonAction/ButtonAction";
import toast from "react-hot-toast";

export const CourseDetailCommentPage = () => {
  const { CourseId } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState("");
  const [acceptStatus, setAcceptStatus] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [commentId, setCommentId] = useState(null);

  // get data
  const { data, isLoading, refetch } = getCourseCommentSingel(
    "getCourseCommentSingel",
    `/Course/GetCourseCommnets/${CourseId}`,
    true
  );

  if (!isLoading) {
    console.log("data ==>", data);
    if (!commentData) {
      setCommentData(data);
    }
  }

  const headerData = [
    "نام کاربر",
    "عنوان کامنت",
    "متن کامنت",
    "وضعبت",
    "اقدام",
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
  ];

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
            refetch();
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
            refetch();
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
            refetch();
          },
        }
      );
    }
  };

  // change pagination
  const changePagination = () => {
    const data = paginationCalculator(commentData, pageNumber, rowsOfPage);
    setFullData(data);
  };

  useEffect(() => {
    if (commentData) {
      changePagination();
    }
  }, [commentData, pageNumber, rowsOfPage]);

  console.log("CourseId ==>", CourseId);

  const acceptElem = (
    <ButtonAction dataArray={actionData2} itemClickHandle={actionClickHdnler} />
  );
  const acceptElem2 = (
    <ButtonAction dataArray={actionData} itemClickHandle={actionClickHdnler} />
  );

  const cardclickHadnler = (item) => {
    console.log("item ==>", item);
    setCommentId(item.id);
  };

  return (
    <>
      {fullData && (
        <Export
          headers={headerData}
          dataMap={fullData}
          titleField="author"
          fieldKeys={[
            "title",
            "describe",
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
          // clickHandle={getCommentReplayHandler}
        />
      )}
    </>
  );
};
