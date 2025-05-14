import React from 'react'
import { CardBody, CardHeader, Col, Row } from 'reactstrap'

const HeadLabelComp = () => {
  return (
    // <CardBody className='w-100 bg-body-secondary'>
    //   <Row>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //     <Col>
    //       <label>کاربر</label>
    //     </Col>
    //   </Row>
    // </CardBody>

    <table className='table table-hover w-100 p-0 m-0'>
        <thead className='text-center w-100 p-0 m-0'>
            <tr className='w-100 px-0 m-0'>
                <th className='px-0 m-0'> کاربر </th>
                <th className='px-0'> نام کاربر </th>
                <th className='px-0'> نقش </th>
                <th className='px-0'> ایمیل </th>
                <th className='px-0'> درصد تکمیل پروفایل </th>
                <th className='px-0'> وضعبت </th>
                <th className='px-0'> اقدام </th>
            </tr>
        </thead>
    </table>
  )
}

export default HeadLabelComp
