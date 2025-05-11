// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import Preview from '../../../../view/news/NewsDetails/list/Preview'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>پیش نمایش</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>جزئیات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>کامنت ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <Preview />
        </TabPane>
        <TabPane tabId='2'>
          {/* <SecurityTab /> */}
        </TabPane>
        <TabPane tabId='3'>
          {/* <BillingPlanTab /> */}
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
