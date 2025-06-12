import { useParams } from "react-router-dom";
import Export from "../../../@core/components/common/Export/Export";
import { useEffect, useState } from "react";
import {
  getNewsCommentSingelData,
  rejectComment,
} from "../../../@core/services/api";
import { paginationCalculator } from "../../../@core/hooks";
import { CheckCircle, Navigation, PlusSquare, Trash2 } from "react-feather";
import ButtonAction from "../../../@core/components/common/ButtonAction/ButtonAction";
import toast from "react-hot-toast";

const NewsDetailCommentPage = () => {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsOfPage, setRowsOfPage] = useState(8);
  const [query, setQuery] = useState("");
  const [acceptStatus, setAcceptStatus] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [commentId, setCommentId] = useState(null);

  // get data
  const { data, isLoading, refetch } = getNewsCommentSingelData(
    "getNewsCommentSingelData",
    `/News/GetNewsComments`,
    { NewsId: id },
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
    "اقدام",
  ];

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
          hover={true}
          titleField="autor"
          fieldKeys={[
            "title",
            "describe",
          ]}
          btnKeys={{
            flag: false,
          }}
          Btn={"Ok"}
          btnOnClick={cardclickHadnler}
          // clickHandle={getCommentReplayHandler}
        />
      )}
    </>
  );
};

export default NewsDetailCommentPage;
