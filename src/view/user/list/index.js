import React from 'react'
import { Col, Row } from 'reactstrap'
import UsersReport from './Reports'
import UserFilterBar from './UserFilterBar'
import UserListWrapper from './UserListWrapper'
// import Table from "./Table"

const UserList = () => {
  return (
    <Row>
        <UsersReport />
        {/* <Col sm="12">
          <FilterBar />
        </Col> */}
        {/* <Table /> */}
        <UserFilterBar />
        <UserListWrapper />
    </Row>
  )
}

export default UserList
