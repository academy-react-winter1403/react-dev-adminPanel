// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components
// import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard.js";

// Redux
import { useDispatch, useSelector } from "react-redux";
// import { handleDetails } from "../store/UserInfoSlice";

// Api
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner.js";

// ** Styles
import "@styles/react/apps/app-users.scss";
import UserTabs from "./UserTabs.js";
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner.js";
import { getUserInfoData } from "../../../@core/services/api/index.js";
import { addUserInfoData } from "../list/users/store/actions.js";

const UserView = () => {
  const state = useSelector((state) => state);
  const { userInfoData } = state.userInformationSlice;

  console.log(userInfoData);

  const [active, setActive] = useState("1");
  //   const userDetails = useSelector((state) => state.UserInfoSlice.details);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { data, isLoading } = getUserInfoData(
    "userInfoData",
    "/User/UserDetails/",
    id
  );
  if (!isLoading) {
    dispatch(addUserInfoData(data));
  }
  if (isLoading) {
    return <SpinnerComponent />
  }

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard
            submitUserUpdate={""}
            show={show}
            setShow={setShow}
            // refetch={refetch}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            active={active}
            toggleTab={toggleTab}
            // userDetails={userDetails}
          />
        </Col>
      </Row>
    </div>
  );

};
export default UserView;
