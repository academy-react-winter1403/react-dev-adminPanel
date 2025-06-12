import React from "react";
import {
  Row,
  CardImg,
  Card,
  Col,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import picWoman from "../../../@core/assets/photos/partial/woman.jpg";
import picMan from "../../../@core/assets/photos/partial/man.jpg";
import Avatar from "@components/avatar";
import AvatarIcons from "../../../@core/components/common/AvatarIcons/AvatarIcons";
import { IconsPicAvatar } from "../../../@core/components/common";
import { FileText, MoreVertical, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";

const UserCard = ({
  userName,
  id,
  children,
  emailAddress,
  profileNum,
  status,
  picAddress,
  gender,
  cardClick,
  handleDelete,
  navigationName
}) => {
  const navigate = useNavigate()

  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "38px"}}>
        <div className="w-100" style={{position: "relative", right: "30px"}}>
          <IconsPicAvatar iconSrc={picAddress} auxiliaryPhoto={gender ? picWoman : picMan} />
        </div>
      </td>
      <td onClick={cardClick}>{userName ? userName : "اسم نداره کاربر"}</td>
      <td className="p-0">
        {children}
      </td>
      <td>{emailAddress ? emailAddress : "ایمیل نداره کاربر"}</td>
      <td>{profileNum}</td>
      <td>
        <Badge color={status === "True" ? "light-primary" : "btn btn-danger"} className="me-1">
          {status === "True" ? "فعال" : "غیرفعال"}
        </Badge>
      </td>

      <td style={{ width: "100px" }} className="px-0">
        <UncontrolledDropdown direction="start">
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu className="d-flex flex-column p-0">
            <DropdownItem
              onClick={(e) => {
                e.preventDefault();
                navigate(`/user-list/view/${id}`);
              }}
            >
              <FileText className="me-50" size={15} />{" "}
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              onClick={(event) => {
                event.preventDefault();
                handleDelete()
              }}
            >
              <Trash className="me-50" size={15} />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default UserCard;
