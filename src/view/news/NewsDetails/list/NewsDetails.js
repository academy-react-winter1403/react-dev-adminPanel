import { Col, Row } from "reactstrap";
import UserInfoCard from "../../../../@core/components/common/UserInfoCard/UserInfoCard";
import UserTabs from "../../../../@core/components/common/Tabs/UserTabs";
import { useEffect, useState } from "react";
import { getData,usePutData } from "../../../../@core/services/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getNewsDetailData } from './../../../../@core/services/api/get-api/getNewsDetailData';
import { getNewsDetailData } from "../../../../@core/services/api";

const NewsDetails = () => {
  const headers = ["عنوان", "تاریخ", "امتیاز", "وضعیت"];
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  // const {
  //   dataNewsDetails,
  //   titleDetails,
  //   avatarImg,
  //   Switch,
  //   filedPreview,
  //   filedDetails,
  //   listComments,
  // } = useSelector((state) => state.NewDetailSlice);
  // const dispatch = useDispatch();

  const [titleDetails, setTitleDetails] = useState(null);
  const [avatarImg, setAvatarImg] = useState(null);
  const [Primary, setPrimary] = useState(null);
  const [filedPreview, setFiledPreview] = useState([]);
  const [filedDetails, setFiledDetails] = useState([]);
  const [listComments, setListComments] = useState([]);

  const { id } = useParams();
  const { data, isLoading } = getData("category", `/News/${id}`);
  useEffect(() => {
    if (!isLoading && data) {
      console.log("it is data", data);
      setTitleDetails(data.detailsNewsDto?.title);
      setPrimary(data.detailsNewsDto?.active);
      setAvatarImg(data.detailsNewsDto?.currentImageAddress);
      setListComments(data.commentDtos);
      const previewData = [
        {
          title: "تعداد بازدید ها",
          describe: data.detailsNewsDto.currentView ?? "نامشخص",
        },
        {
          title: "تعداد کامنت ها",
          describe: data.detailsNewsDto?.commentsCount ?? "نامشخص",
        },
        {
          title: "تعداد پسندیده ها",
          describe: data.detailsNewsDto?.currentLikeCount ?? "نامشخص",
        },
        {
          title: "تعداد ناپسندیده ها",
          describe: data.detailsNewsDto?.currentLikeCount ?? "نامشخص",
        },
        {
          title: "علاقمندی",
          describe: data.detailsNewsDto?.isCurrentUserFavorite ? "بله" : "خیر",
        },
        {
          title: "تاریخ ثبت",
          describe: data.detailsNewsDto?.insertDate ?? "نامشخص",
        },
        {
          title: "تعداد علاقمند ها",
          describe: data.detailsNewsDto?.inUsersFavoriteCount ?? "نامشخص",
        },
        {
          title: "تاریخ تغییرات",
          describe: data.detailsNewsDto?.updateDate ?? "نامشخص",
        },
      ];
      setFiledPreview(previewData);
      const DetailsData = [
        {
          title: "عنوان اخبار",
          describe: data.detailsNewsDto?.title ?? "نامشخص",
        },
        {
          title: "ساخته شده توسط",
          describe: data.detailsNewsDto?.addUserFullName ?? "نامشخص",
        },
        {
          title: "دستبندی با اسم",
          describe: data.detailsNewsDto?.newsCatregoryName ?? "نامشخص",
        },
        {
          title: "سئو عنوان اخبار",
          describe: data.detailsNewsDto?.googleTitle ?? "نامشخص",
        },
        {
          title: "توضیحات ",
          describe: data.detailsNewsDto?.describe ?? "نامشخص",
        },
      ];
      setFiledDetails(DetailsData);
    }
    console.log({
      titleDetails,
      avatarImg,
      Primary,
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
    setPrimary(newValue);
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
          avatarImg={avatarImg}
          Primary={Primary}
          checked={handleSwitchChange}
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
