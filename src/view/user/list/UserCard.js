import React from "react";
import { Row, CardImg, Card, Col, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import pic from "../../../@core/assets/photos/partial/woman.jpg";
import Avatar from "@components/avatar";
import AvatarIcons from "../../../@core/components/common/AvatarIcons/AvatarIcons";
import { IconsPicAvatar } from "../../../@core/components/common";
import { FileText, MoreVertical, Trash } from "react-feather";

const UserCard = ({userName, }) => {
  return (
    <tr className="text-center">
      <td className="px-0" style={{ width: "80px" }}>
        <IconsPicAvatar iconSrc={pic} />
      </td>
      <td>مسیح</td>
      <td className="p-0" >
        <Row>
          <Col className="m-0 p-0" md="3">ادمین</Col>
          <Col className="m-0 p-0" md="3">استاد</Col>
          <Col className="m-0 p-0" md="4">دانشجو</Col>
        </Row>
      </td>
      <td>6536masih@gmail.com</td>
      <td>100</td>
      <td>
        <Badge color={"light-primary"} className="me-1">
          {" "}
          فعال{" "}
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
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/users/view/" + item.id);
              }}
            >
              <FileText className="me-50" size={15} />{" "}
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteUser(item.id);
              }}
            >
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default UserCard;
