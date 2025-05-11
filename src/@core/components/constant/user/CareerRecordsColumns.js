// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// import rolPhoto from "../../../assets/images/portrait/small/teacher.png"
// import styled from 'styled-components'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User,
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {/* <img src={"rolPhoto.png"}/> */}
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const CareerRecordsColumns = [
  {
    name: 'کاربر',
    sortable: false,
    minWidth: '130px',
    sortField: 'fullName',
    selector: row => row.fullName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.fullName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'نام شغل',
    sortable: false,
    minWidth: '130px',
    sortField: 'role',
    selector: row => row.role,
    // cell: row => renderRole(row)
    cell: row => <span style={{color: "#fff", fontFamily: "tahoma"}}> شغل </span>
  },
  {
    name: 'درباره شغل',
    minWidth: '130px',
    sortable: false,
    sortField: 'currentPlan',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row.currentPlan}</span>
  },
  {
    name: 'تاریخ شروع / پایان',
    minWidth: '130px',
    sortable: false,
    sortField: 'billing',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.billing}</span>
  },
  {
    name: 'شرکت',
    minWidth: '130px',
    sortable: false,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'نمایش',
    minWidth: '130px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'> جزئیات </span>
            </DropdownItem>
            {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem> */}
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'> حذف </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  },
  {
    name: 'وضعیت کار',
    minWidth: '130px',
  },
  {
    name: 'اقدام',
    minWidth: '130px',
  }
]
