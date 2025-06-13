// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols, number }) => {
  const data = [
    {
      title: number.reserved,
      subtitle: 'دوره های رزرو',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: number.rejected,
      subtitle: 'دوره های رزرو شده تایید نشده',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: number.accepted,
      subtitle: 'دوره های رزرو شده تایید شده',
      color: 'light-danger',
      icon: <Box size={24} />
    },
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
          style={{width: "250px"}}
        >
          <div className='d-flex align-items-center' >
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'> دوره ها </CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row style={{display: "flex", justifyContent: "space-around"}}>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
