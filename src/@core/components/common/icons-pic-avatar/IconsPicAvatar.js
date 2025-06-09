import React from "react";
// import pic from "../../../../@core/assets/photos/partial/woman.jpg"

const IconsPicAvatar = ({ iconSrc, auxiliaryPhoto }) => {
  return <img src={!iconSrc || iconSrc === "Not-set" ? auxiliaryPhoto : iconSrc} className="w-100 h-100 rounded-5" />;
};

export default IconsPicAvatar;
