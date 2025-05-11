// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, MessageSquare, FileText } from "react-feather";

// ** User Components
import Preview from "../../../../view/news/NewsDetails/list/Preview";
import Export from "../Export/Export";
import Details from "../../../../view/news/NewsDetails/list/Details.";

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">پیش نمایش</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <FileText className="font-medium-3 me-50" />
            <span className="fw-bold">جزئیات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <MessageSquare className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Preview />
        </TabPane>
        <TabPane tabId="2">
          <Details />
        </TabPane>
        <TabPane tabId="3">
          <Export />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
