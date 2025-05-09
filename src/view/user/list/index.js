import React from 'react'
import { Col, Row } from 'reactstrap'
import UsersReport from './Reports'
import Table from "./Table"

const UserList = () => {
  return (
    <Row>
        <UsersReport />
        {/* <Col sm="12">
          <FilterBar />
        </Col> */}
        <Table />
    </Row>
  )
}

export default UserList
