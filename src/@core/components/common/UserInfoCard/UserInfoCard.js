// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import Switch from "../Switch/Switch";
import ModalForm from "../modals/ModalForm";

const UserInfoCard = ({
  avatarImg,
  TitleDetails,
  Primary,
  checked,
  title,
  titleData,
  titleTotal,
  children,
  childrenData,
  childrenTotal,
  Modals,
}) => {
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section pb-4">
            <div className="d-flex align-items-center flex-column p-1">
              <img src={avatarImg} className="w-50"/>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-2 mb-1 d-flex justify-content-center">
            {TitleDetails}
          </h4>
            {Modals ? (
              <div className="d-flex justify-content-center gap-1 align-items-center pt-2 pb-2">
                <ModalForm title={title} children={children} />
                <Switch Primary={Primary} checked={checked} />
              </div>
            ) : (
              <div className="d-flex justify-content-center flex-wrap gap-1 align-items-center pt-2 pb-2">
                <ModalForm title={title} children={children} />
                <ModalForm title={titleData} children={childrenData} />
                <ModalForm title={titleTotal} children={childrenTotal} />
                <Switch Primary={Primary} checked={checked} />
              </div>
            )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserInfoCard;
