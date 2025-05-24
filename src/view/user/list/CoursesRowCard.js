import { IconsPicAvatar } from "../../../@core/components/common";
import AvatarIcons from "../../../@core/components/common/AvatarIcons/AvatarIcons";
import pic from "../../../@core/assets/photos/01.jpg";
import { Eye } from "react-feather";
import { useState } from "react";
import { useEffect } from "react";
import { ChangeMoment } from "../../../@core/hooks";
import { string } from "yup";

export const CoursesRowCard = ({
  userImage,
  courseName,
  courseDescription,
  courseLastDate,
  action
}) => {
  const [calender, setCalender] = useState(null);
  const [lastDate, setLastUpdate] = useState(null);
  const courseLastDateTypeOf = typeof(courseLastDate)

  const calcMoment = () => {
    // console.log(typeof courseLastDate)
    if (courseLastDateTypeOf === "string") {
        setLastUpdate(courseLastDate.slice(0, 10));
    }
  };

  useEffect(() => {
    calcMoment();
  }, []);

  useEffect(() => {
    setCalender(ChangeMoment(lastDate, "YYYY/MM/DD", "persian"));
  }, [lastDate]);

  return (
    <div>
      <table className="w-100 m-0">
        <tbody className="w-100 m-0">
          <tr
            className="w-100 mt-2 pb-1 border-bottom px-1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <td
              className="photo-and-userName w-50"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "14px",
              }}
            >
              <div
                className="photo-control"
                style={{
                  width: "39px",
                  height: "39px",
                }}
              >
                <IconsPicAvatar iconSrc={userImage} auxiliaryPhoto={pic} />
              </div>
              <label>{courseName}</label>
            </td>
            <td
              className="w-50"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "69px",
              }}
            >
              <td
                style={{
                  width: "110px",
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                <label className="w-100">{courseDescription}</label>
              </td>
              <td>
                <label>{courseLastDateTypeOf == "string" ? calender : courseLastDate}</label>
              </td>
              <td>
                {action}
              </td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
