// ** React Imports
import { useRef, useState } from "react";
// import { usePostData } from "../../../../@core/services/api/post-api/postData";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import AccountDetails from "../list/AccountDetails";
import FirstStageCourse from "../list/FirstStageCourse";
import SecondStageCourse from "../list/SecondStageCourse";
import ThirdStageCourse from "../list/ThirdStageCourse";

// ** Icons Imports
import { FileText, Image } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { usePostData } from "../../../@core/services/api";
import { v4 as uuidv4 } from "uuid";

const CreateCourse = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const { mutate: postDataMutate } = usePostData("postAllData");
  const ImageCourse = useSelector(
    (state) => state.allDataAddCourse.ImageCourse
  );
  const CourseInfoStepOne = useSelector(
    (state) => state.allDataAddCourse.CourseInfoStepOne
  );
  const CourseInfoStepTwo = useSelector(
    (state) => state.allDataAddCourse.CourseInfoStepTwo
  );

  const handleStepSubmit = (finalAdditionalData) => {
    // const uniqueUrl = uuidv4();
    const dataObj = {
      ImageCourse,
      // UniqueUrlString: uniqueUrl,
      // ShortLink: uniqueValuesRef.current.shortLink,
      ...CourseInfoStepOne,
      ...CourseInfoStepTwo,
      ...finalAdditionalData,
    };
    console.log(dataObj);
    postDataMutate(["/Course", dataObj, "multipart/form-data"], {
      onSuccess: (data) => {
        alert("Success:", data);
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
      id: "FirstStageCourse",
      title: "مشخصات دوره مرحله اول",
      subtitle: "جزئیات کارت را تکمیل کنید",
      icon: <FileText size={18} />,
      content: <FirstStageCourse stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "SecondStageCourse",
      title: "مشخصات دوره مرحله دوم",
      subtitle: "جزئیات کارت را تکمیل کنید",
      icon: <FileText size={18} />,
      content: <SecondStageCourse stepper={stepper} type="modern-vertical" />,
    },
    {
      id: "ThirdStageCourse",
      title: "مشخصات دوره مرحله سوم",
      subtitle: "جزئیات کارت را تکمیل کنید",
      icon: <FileText size={18} />,
      content: (
        <ThirdStageCourse
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

export default CreateCourse;
