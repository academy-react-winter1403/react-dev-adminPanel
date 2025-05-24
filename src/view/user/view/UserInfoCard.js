import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { IconsPicAvatar } from "../../../@core/components/common";
import pic from "../../../@core/assets/photos/01.jpg";
import {
  getUserInfoData,
  updateUserInformation,
} from "../../../@core/services/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfoData } from "../list/users/store/actions";
// import { Button } from "bootstrap";
import EditeUserInfoComp from "../list/EditeUserInfoComp";
import { useState } from "react";
import questionPic from "../../../@core/assets/photos/face-with-monocle-emoji-.png";
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner";

const UserInfoCard = () => {
  const dispatch = useDispatch();
  const [editFormShowFlag, setEditFormShowFlag] = useState(false);
  const [questionModalFlag, setQuestionModalFlag] = useState(false);

  // change question modal display
  const changeModalDisplay = () => setQuestionModalFlag(!questionModalFlag);
  // change question modal display

  const { userInformationSlice } = useSelector((state) => state);
  const { userInfoData } = userInformationSlice;
  // console.log(userInfoData);

  // edit btn click handler
  const editBtnClickHandler = () => {
    setEditFormShowFlag(true);
  };

  const { mutate } = updateUserInformation("updateUserInfo");
  const userIfoEditeHandler = (event) => {
    console.log(event);
    const gender = event.gender === "true" ? true : false;
    const dataObj = {
      fName: event.firstName,
      lName: event.lastName,
      userName: event.username,
      nationalCode: event.nationalCode,
      phoneNumber: event.contact,
      gmail: event.email,
      gender: gender,
    };
    mutate(["/User/UpdateUser", dataObj, "application/json"], {
      onSuccess: (response) => {
        console.log(response);
      },
    });
  };

  return (
    <Card className="m-0 p-0">
      <Card className="m-0 p-0">
        <CardHeader className="m-0">
          <Row className="w-100 m-0 flex flex-row justify-content-center">
            <div
              style={{
                width: "154px",
                height: "109px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconsPicAvatar
                iconSrc={userInfoData?.currentPictureAddress}
                auxiliaryPhoto={pic}
              />
            </div>
          </Row>
          <Row className="w-100 flex flex-row justify-content-center m-0 mt-1 p-0">
            <label className="text-center m-0 p-0">{`${userInfoData?.fName} ${userInfoData?.lName}`}</label>
          </Row>
        </CardHeader>
        <CardBody>
          <div
            style={{
              display: "flex",
              flexFlow: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {userInfoData?.roles.map((item) => {
              // console.log(item);
              return (
                <span className="text-capitalize cursor-pointer badge bg-light-primary">
                  {item.roleName}
                </span>
              );
            })}
          </div>
          <Row className="flex flex-row justify-content-center mt-2">
            <Col className="" md="4">
              <div
                className="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label>25</label>
                <label> دور ها </label>
              </div>
              <div className="right"></div>
            </Col>
            <Col md="4">
              <div
                className="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label>2</label>
                <label> دوره های رزرو شده </label>
              </div>
              <div className="right"></div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <label className="divider-text fs-2">جزئیات</label>
          <Row className="m-0 p-0">
            <ul
              className="list-unstyled m-1"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <li>
                <label> نام کاربری : </label>
                <span> {userInfoData?.userName} </span>
              </li>
              <li>
                <label> ایمیل : </label>
                <span> {userInfoData?.gmail} </span>
              </li>
              <li>
                <label> وضعیت : </label>
                <span> {userInfoData?.active ? "فعال" : "غیرفعال"} </span>
              </li>
              <li>
                <label> جنسیت : </label>
                <span> {userInfoData?.gender ? "مرد" : "زن"} </span>
              </li>
              <li>
                <label> کدملی : </label>
                <span> {userInfoData?.nationalCode} </span>
              </li>
              <li>
                <label> شماره موبایل : </label>
                <span> {userInfoData?.phoneNumber} </span>
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              className="mt-2"
            >
              <Button
                color="primary"
                type="button"
                onClick={editBtnClickHandler}
              >
                ویرایش
              </Button>
              <Button
                className="ms-1"
                color="danger"
                outline
                onClick={() => setQuestionModalFlag(!questionModalFlag)}
              >
                غیرفعال کردن
              </Button>
            </div>
            <Modal
              isOpen={questionModalFlag}
              toggle={changeModalDisplay}
              className="mt-5"
            >
              <ModalHeader toggle={changeModalDisplay}></ModalHeader>
              <ModalBody>
                <div className="top-control">
                  <div
                    className="img-control"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={questionPic}
                      style={{ width: "130px", height: "130px" }}
                    />
                  </div>
                  <div
                    className="text-control mt-2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label> مطمئنی میخوای غیرفعال کنی؟؟ </label>
                    <label> البته اینم بگم راه برگشت هست👌👌 </label>
                  </div>
                </div>
                <div
                  className="btn-control m-2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {/* <button type="button" class="btn btn-outline-primary"> بله </button> */}
                  <Button type="button" color="btn btn-outline-primary">
                    بله
                  </Button>
                  <Button
                    type="button"
                    color="btn btn-outline-danger"
                    onClick={() => setQuestionModalFlag(!questionModalFlag)}
                  >
                    خیر
                  </Button>
                </div>
              </ModalBody>
              {/* <ModalFooter></ModalFooter> */}
            </Modal>
          </Row>
        </CardFooter>
        <EditeUserInfoComp
          data={userInfoData}
          show={editFormShowFlag}
          setShow={setEditFormShowFlag}
          submitUserUpdate={userIfoEditeHandler}
        />
      </Card>
      <Card></Card>
    </Card>
  );
};

export default UserInfoCard;
