import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Export from "../../../../@core/components/common/Export/Export";
import ButtonAction from "../../../../@core/components/common/ButtonAction/ButtonAction";
import { useEffect, useState } from "react";
import { paginationCalculator } from "../../../../@core/hooks";
import SeparatedPagination from "../../../../@core/components/common/PaginationSeparated/PaginationSeparated";
import { CheckCircle, Navigation, PlusSquare, Trash2 } from "react-feather";
import {
  acceptComment,
  deleteComment,
  rejectComment,
} from "../../../../@core/services/api";
import toast from "react-hot-toast";

const ReplayModal = ({ isOpen, toggle, refetchGetCommentReplayData }) => {
  const { commentReplay } = useSelector(
    (state) => state.allCourseCommentManagementSlice
  );
  const [fullData, setFullData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(3);
  const [commentId, setCommentId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const headerData = ["کاربر", "عنوان کامنت", "توضیحات", "وضعیت", "عملیات"];

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

  const changePagination = () => {
    const data = paginationCalculator(commentReplay, pageNumber, rowsOfPage);
    setFullData(data);
  };

  useEffect(() => {
    if (commentReplay) {
      changePagination();
    }
  }, [commentReplay, pageNumber, rowsOfPage]);

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
            refetchGetCommentReplayData()
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
            refetchGetCommentReplayData()
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
            refetchGetCommentReplayData()
          },
        }
      );
    }
  };

  const acceptElem = (
    <ButtonAction dataArray={actionData2} itemClickHandle={actionClickHdnler} />
  );
  const acceptElem2 = (
    <ButtonAction dataArray={actionData} itemClickHandle={actionClickHdnler} />
  );

  const replayCardBtnClickHandler = (item) => {
    console.log("value ==>", item);
    setCommentId(item.id);
    setCourseId(item.courseId);
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog modal-dialog-centered"
      style={{ minWidth: "900px" }}
    >
      <ModalHeader toggle={toggle}>
        <h2>پاسخ های این کامنت</h2>
      </ModalHeader>
      <ModalBody className="p-0">
        {fullData && (
          <Export
            headers={headerData}
            dataMap={fullData}
            titleField="author"
            fieldKeys={["title", "describe", { keyName: "accept" }]}
            statusKey={{
              accept: {
                trueField: "تایید شده",
                falseField: "تایید نشده",
              },
            }}
            btnKeys={{
              flag: true,
              keyName: "accept",
              trueField: acceptElem2,
              falseField: acceptElem,
            }}
            btnOnClick={replayCardBtnClickHandler}
          />
        )}
      </ModalBody>
      <SeparatedPagination
        RowsOfPage={rowsOfPage}
        totalCount={commentReplay?.length}
        changePageNumber={(pageNumber) => {
          setPageNumber(pageNumber);
        }}
      />
    </Modal>
  );
};

export default ReplayModal;
