// ** React Imports
import { useRef, useState } from "react";
import { usePostData } from "../../../../@core/services/api/post-api/postData";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import AccountDetails from "./../validationList/AccountDetails";
import PersonalInfo from "../validationList/PersonalInfo";
import SocialLinks from "../validationList/SocialLinks";

// ** Icons Imports
import { FileText, User, MapPin, Link, Image } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

const AddNews = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const { mutate: postDataMutate } = usePostData("postAllData");
  const mainInfo = useSelector((state) => state.allDataAddNews.mainInfo);
  const image = useSelector((state) => state.allDataAddNews.Image);
  const handleStepSubmit = (finalAdditionalData) => {
    const dataObj = {
      image,
      ...mainInfo,
      ...finalAdditionalData,
    };
    // console.log(image)
    postDataMutate(["/News/CreateNews", dataObj, "multipart/form-data"], {
      onSuccess: (data) => {
        console.log("Success:", data);
        stepper.next();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  const steps = [
    {
      id: "image",
      title: "افزودن عکس",
      subtitle: "عکس اخبار را انتخاب کنید",
      icon: <Image size={18} />,
      content: <AccountDetails stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "card-information",
      title: "اطلاعات کارت",
      subtitle: "جزئیات کارت را تکمیل کنید",
      icon: <FileText size={18} />,
      content: <PersonalInfo stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "social-links",
      title: "اطلاعات تکمیلی",
      subtitle: "اطلاعات کارت را تکمیل کنید",
      icon: <Link size={18} />,
      content: (
        <SocialLinks
          stepper={stepper}
          type="modern-vertical"
          onFinalSubmit={handleStepSubmit}
        />
      ),
    },
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: true,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default AddNews;
