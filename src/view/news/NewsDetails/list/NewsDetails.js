import { Col, Row } from "reactstrap";
import UserInfoCard from "../../../../@core/components/common/UserInfoCard/UserInfoCard";
import CardRoles from "../../../../@core/components/common/CardRoles/CardRoles";
import GoalOverview from "../../../../@core/components/common/GoalOverview/GoalOverview";
import UserTabs from "../../../../@core/components/common/Tabs/UserTabs";
import { useState } from "react";
// import CardDescription from "../../../../@core/components/common/CardDescription/CardDescription";

const NewsDetails = () => {
  const [active, setActive] = useState('1')
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <Row>
      <Col md={4} className="mt-5">
        <UserInfoCard />
      </Col>
      <Col md={8}>
        <Row>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Row>
      </Col>
    </Row>
  );
};
export default NewsDetails;
