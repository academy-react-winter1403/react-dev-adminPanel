import { Col, Row } from "reactstrap";
import UserInfoCard from "../../../../@core/components/common/UserInfoCard/UserInfoCard";
import UserTabs from "../../../../@core/components/common/Tabs/UserTabs";
import { useEffect, useState } from "react";
import { getData,usePutData } from "../../../../@core/services/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getNewsDetailData } from './../../../../@core/services/api/get-api/getNewsDetailData';
import { getNewsDetailData } from "../../../../@core/services/api";
import { setAvatarImg, setDataNewsDetails, setFiledDetails, setFiledPreview, setListComments, setSwitch, setTitleDetails } from "../store/NewDetailSlice";
import ChildrenModal from "./ChildrenModal";

const NewsDetails = () => {
  const headers = ["عنوان", "تاریخ", "امتیاز", "وضعیت"];
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const {
    titleDetails,
    avatarImg,
    Switch,
    filedPreview,
    filedDetails,
    listComments,
    dataNewsDetails
  } = useSelector((state) => state.NewDetailSlice);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { data, isLoading } = getData("category", `/News/${id}`);
  useEffect(() => {
    if (!isLoading && data) {
      console.log("it is data", data);
      dispatch(setDataNewsDetails(data.detailsNewsDto))
      dispatch(setTitleDetails(data.detailsNewsDto?.title))
      dispatch(setSwitch(data.detailsNewsDto?.active))
      dispatch(setAvatarImg(data.detailsNewsDto?.currentImageAddress));
      dispatch(setListComments(data.commentDtos));
      const previewData = [
        {
          // key: "currentView",
          title: "تعداد بازدید ها",
          describe: data.detailsNewsDto.currentView ?? "نامشخص",
        },
        {
          // key: "commentsCont",
          title: "تعداد کامنت ها",
          describe: data.detailsNewsDto?.commentsCount ?? "نامشخص",
        },
        {
          // key: "likesCount",
          title: "تعداد پسندیده ها",
          describe: data.detailsNewsDto?.currentLikeCount ?? "نامشخص",
        },
        {
          // key: "currentLikeCount",
          title: "تعداد ناپسندیده ها",
          describe: data.detailsNewsDto?.currentLikeCount ?? "نامشخص",
        },
        {
          // key: "isCurrentUserFavorite",
          title: "علاقمندی",
          describe: data.detailsNewsDto?.isCurrentUserFavorite ? "بله" : "خیر",
        },
        {
          // key: "insertDate",
          title: "تاریخ ثبت",
          describe: data.detailsNewsDto?.insertDate ?? "نامشخص",
        },
        {
          // key: "inUsersFavoriteCount",
          title: "تعداد علاقمند ها",
          describe: data.detailsNewsDto?.inUsersFavoriteCount ?? "نامشخص",
        },
        {
          // key: "updateDate",
          title: "تاریخ تغییرات",
          describe: data.detailsNewsDto?.updateDate ?? "نامشخص",
        },
      ];
      dispatch(setFiledPreview(previewData));
      const DetailsData = [
        {
          // key: "title",
          title: "عنوان اخبار",
          describe: data.detailsNewsDto?.title ?? "نامشخص",
        },
        {
          // key: "addUserFullName",
          title: "ساخته شده توسط",
          describe: data.detailsNewsDto?.addUserFullName ?? "نامشخص",
        },
        {
          // key: "newsCatregoryName",
          title: "دستبندی با اسم",
          describe: data.detailsNewsDto?.newsCatregoryName ?? "نامشخص",
        },
        {
          // key: "googleTitle",
          title: "سئو عنوان اخبار",
          describe: data.detailsNewsDto?.googleTitle ?? "نامشخص",
        },
        {
          // key: "describe",
          title: "توضیحات ",
          describe: data.detailsNewsDto?.describe ?? "نامشخص",
        },
      ];
      dispatch(setFiledDetails(DetailsData))
    }
    console.log({
      titleDetails,
      avatarImg,
      Switch,
      filedPreview,
      filedDetails,
    });
  }, [isLoading, data]);
  const dataWithRatio = listComments.map((item) => ({
    ...item,
    likeRatio: `${item.likeCount}/${item.dissLikeCount}`,
  }));
  const { mutate: putDataMutate } = usePutData("postAllData");
  const handleSwitchChange = async (newValue) => {
    dispatch(setSwitch(newValue))
    // setPrimary(newValue);
    const dataObj = {
      Active: newValue,
      Id: id,
    };
    putDataMutate(
      ["/News/ActiveDeactiveNews", dataObj, "multipart/form-data"],
      {
        onSuccess: (data) => {
          console.log("Success:", data);
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      }
    );
  };
  return (
    <Row>
      <Col md={4} className="mt-5">
        <UserInfoCard
          TitleDetails={titleDetails}
          filedPreview={filedPreview}
          avatarImg={avatarImg}
          Primary={Switch}
          checked={handleSwitchChange}
          title={"ادیت اخبار"}
          children={<ChildrenModal />}
        />
      </Col>
      <Col md={8}>
        <Row>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            filedPreview={filedPreview}
            filedDetails={filedDetails}
            dataMap={dataWithRatio}
            fieldKeys={["inserDate", "likeRatio"]}
            headers={headers}
            titleField="title"
            // Btn={}
          />
        </Row>
      </Col>
    </Row>
  );
};
export default NewsDetails;
