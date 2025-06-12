// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, MessageSquare, FileText } from "react-feather";

// ** User Components

import Export from "../Export/Export";
import Details from "../Details/Details";
import Preview from "../Preview/Preview";
import { CourseDetailCommentPage } from "../../../../view/courseManagement/list/CourseDetailCommentPage";

const UserTabs = ({
  active,
  toggleTab,
  filedPreview,
  filedDetails,
  headers,
  fieldKeys,
  dataMap,
  titleField,
  Btn,
  tab3Children,
  children,
  children1,
  mentorChildren,
}) => {
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
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <MessageSquare className="font-medium-4 me-50" />
            <span className="fw-bold">گروه ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <MessageSquare className="font-medium-5 me-50" />
            <span className="fw-bold">گروه های مجازی</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "6"} onClick={() => toggleTab("6")}>
            <MessageSquare className="font-medium-6 me-50" />
            <span className="fw-bold">منتورهای این دوره</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Preview filedPreview={filedPreview} />
        </TabPane>
        <TabPane tabId="2">
          <Details filedDetails={filedDetails} />
        </TabPane>
        <TabPane tabId="3">
          {/* <Export
            headers={headers}
            enableNavigate={false}
            hasImage={false}
            fieldKeys={fieldKeys}
            dataMap={dataMap}
            titleField={titleField}
            Btn={Btn}
            btnKeys={{ flag: false }}
          /> */}
          {tab3Children}
        </TabPane>
        <TabPane tabId="4">{children}</TabPane>
        <TabPane tabId="5">
          {children1}
          {/* <Details filedDetails={filedDetails} /> */}
        </TabPane>
        <TabPane tabId="6">
          {mentorChildren}
          {/* <Details filedDetails={filedDetails} /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
