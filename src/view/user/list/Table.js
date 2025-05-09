// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './SideBar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { userFilterSearchOption } from '../../../@core/components/constant'
import { InputCostume } from '../../../@core/components/common'
import { roleOptions } from '../../../@core/components/constant/userFilterSearchOption'

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => {}}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Add New User
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [statusValue, setStatusValue] = useState({ value: '', label: "انتخاب کنید" })
  const [roleValue, setRoleValue] = useState({ value: '', label: "انتخاب کنید" })

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
//   useEffect(() => {
//     dispatch(getAllData())
//     dispatch(
//       getData({
//         sort,
//         sortColumn,
//         q: searchTerm,
//         page: currentPage,
//         perPage: rowsPerPage,
//         role: currentRole.value,
//         status: currentStatus.value,
//         currentPlan: currentPlan.value
//       })
//     )
//   }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** User filter options
  // const roleOptions = [
  //   { value: '', label: 'Select Role' },
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'author', label: 'Author' },
  //   { value: 'editor', label: 'Editor' },
  //   { value: 'maintainer', label: 'Maintainer' },
  //   { value: 'subscriber', label: 'Subscriber' }
  // ]

  // const planOptions = [
  //   { value: '', label: 'Select Plan' },
  //   { value: 'basic', label: 'Basic' },
  //   { value: 'company', label: 'Company' },
  //   { value: 'enterprise', label: 'Enterprise' },
  //   { value: 'team', label: 'Team' }
  // ]

  // const statusOptions = [
  //   { value: '', label: 'Select Status', number: 0 },
  //   { value: 'pending', label: 'Pending', number: 1 },
  //   { value: 'active', label: 'Active', number: 2 },
  //   { value: 'inactive', label: 'Inactive', number: 3 }
  // ]

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='role-select'> فیلتر براساس نقش </Label>
              <InputCostume
                value={roleValue}
                lable={"Role"}
              />
            </Col>
            {/* <Col className='my-md-0 my-1' md='4'>
              <Label for='plan-select'>Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={planOptions}
                value={currentPlan}
                onChange={data => {
                  setCurrentPlan(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value
                    })
                  )
                }}
              />
            </Col> */}
            <Col md='4'>
              <Label for='status-select'> فیلتر براساس وضعیت </Label>
              <InputCostume
                lable={"انتخاب براساس وضعیت"}
                option={roleOptions}
                value={statusValue}
              />
              {/* <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value
                    })
                  )
                }}
              /> */}
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            // onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            // paginationComponent={CustomPagination}
            // data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                // handleFilter={handleFilter}
                // handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
