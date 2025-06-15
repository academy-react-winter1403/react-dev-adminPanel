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
import CoursePaymentDetail from "../../../../view/courseManagement/list/CoursePaymentDetail";

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
  course
}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        {course ? (
          <>
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
                <User className="font-medium-3 me-50" />
                <span className="fw-bold">پرداختی</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
                <FileText className="font-medium-3 me-50" />
                <span className="fw-bold">گروه</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === "6"} onClick={() => toggleTab("6")}>
                <MessageSquare className="font-medium-3 me-50" />
                <span className="fw-bold">گروه های مجازی</span>
              </NavLink>
            </NavItem>
          </>
        ) : (
          <>
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
          </>
        )}
      </Nav>
      <TabContent activeTab={active}>
        {course ? (
          <>
            <TabPane tabId="1">
              <Preview filedPreview={filedPreview} />
            </TabPane>
            <TabPane tabId="2">
              <Details filedDetails={filedDetails} />
            </TabPane>
            <TabPane tabId="3">
              <Export
                headers={headers}
                enableNavigate={false}
                hasImage={false}
                fieldKeys={fieldKeys}
                dataMap={dataMap}
                titleField={titleField}
                Btn={Btn}
              />
            </TabPane>
            <TabPane tabId="4">
              <CoursePaymentDetail />
            </TabPane>
            <TabPane tabId="5">
              {/* <Details filedDetails={filedDetails} /> */}
            </TabPane>
            <TabPane tabId="6">
              {/* <Export
                headers={headers}
                enableNavigate={false}
                hasImage={false}
                fieldKeys={fieldKeys}
                dataMap={dataMap}
                titleField={titleField}
                Btn={Btn}
              /> */}
            </TabPane>
          </>
        ) : (
          <>
            <TabPane tabId="1">
              <Preview filedPreview={filedPreview} />
            </TabPane>
            <TabPane tabId="2">
              <Details filedDetails={filedDetails} />
            </TabPane>
            <TabPane tabId="3">
              <Export
                headers={headers}
                enableNavigate={false}
                hasImage={false}
                fieldKeys={fieldKeys}
                dataMap={dataMap}
                titleField={titleField}
                Btn={Btn}
              />
            </TabPane>
          </>
        )}
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
