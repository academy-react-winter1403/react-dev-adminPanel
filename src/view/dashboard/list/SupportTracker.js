// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const SupportTracker = ({ props }) => {


    const options = {
        plotOptions: {
          radialBar: {
            size: 150,
            offsetY: 20,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '65%'
            },
            track: {
              background: '#fff',
              strokeWidth: '100%'
            },
            dataLabels: {
              name: {
                offsetY: -5,
                fontFamily: 'Montserrat',
                fontSize: '1rem'
              },
              value: {
                offsetY: 15,
                fontFamily: 'Montserrat',
                fontSize: '1.714rem'
              }
            }
          }
        },
        colors: ["red", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: "",
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          dashArray: 8
        },
        labels: ['Completed Tickets']
      },
      series = [83]


  return (
    <Card>
      <CardHeader className='pb-0'>
        <CardTitle tag='h4'></CardTitle>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu end>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='2' className='d-flex flex-column flex-wrap text-center'>
            <h1 className='font-large-2 fw-bolder mt-2 mb-0'></h1>
            <CardText>Tickets</CardText>
          </Col>
          <Col sm='10' className='d-flex justify-content-center'>
            <Chart options={options} series={series} type='radialBar' height={270} id='support-tracker-card' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <div className='text-center'>
            <CardText className='mb-50'>New Tickets</CardText>
            <span className='font-large-1 fw-bold'></span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Open Tickets</CardText>
            <span className='font-large-1 fw-bold'></span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Response Time</CardText>
            <span className='font-large-1 fw-bold'>d</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
export default SupportTracker
