// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import Switch from "../Switch/Switch";

// const roleColors = {
//   editor: 'light-info',
//   admin: 'light-danger',
//   author: 'light-warning',
//   maintainer: 'light-success',
//   subscriber: 'light-primary'
// }

// const statusColors = {
//   active: 'light-success',
//   pending: 'light-warning',
//   inactive: 'light-secondary'
// }

// const statusOptions = [
//   { value: 'active', label: 'Active' },
//   { value: 'inactive', label: 'Inactive' },
//   { value: 'suspended', label: 'Suspended' }
// ]

// const countryOptions = [
//   { value: 'uk', label: 'UK' },
//   { value: 'usa', label: 'USA' },
//   { value: 'france', label: 'France' },
//   { value: 'russia', label: 'Russia' },
//   { value: 'canada', label: 'Canada' }
// ]

// const languageOptions = [
//   { value: 'english', label: 'English' },
//   { value: 'spanish', label: 'Spanish' },
//   { value: 'french', label: 'French' },
//   { value: 'german', label: 'German' },
//   { value: 'dutch', label: 'Dutch' }
// ]

// const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser, avatarImg,TitleDetails }) => {
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  // const {
  //   reset,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues: {
  //     username: selectedUser.username,
  //     lastName: selectedUser.fullName.split(' ')[1],
  //     firstName: selectedUser.fullName.split(' ')[0]
  //   }
  // })

  // ** render user img
  // const renderUserImg = () => {
  //   if (selectedUser !== null && selectedUser.avatar.length) {
  //     return (
  //       <img
  //         height='110'
  //         width='110'
  //         alt='user-avatar'
  //         src={selectedUser.avatar}
  //         className='img-fluid rounded mt-3 mb-2'
  //       />
  //     )
  //   } else {
  //     return (
  //       <Avatar
  //         initials
  //         color={selectedUser.avatarColor || 'light-primary'}
  //         className='rounded mt-3 mb-2'
  //         content={selectedUser.fullName}
  //         contentStyles={{
  //           borderRadius: 0,
  //           fontSize: 'calc(48px)',
  //           width: '100%',
  //           height: '100%'
  //         }}
  //         style={{
  //           height: '110px',
  //           width: '110px'
  //         }}
  //       />
  //     )
  //   }
  // }

  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     setShow(false)
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }

  // const handleReset = () => {
  //   reset({
  //     username: selectedUser.username,
  //     lastName: selectedUser.fullName.split(' ')[1],
  //     firstName: selectedUser.fullName.split(' ')[0]
  //   })
  // }

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert user!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Suspend user!',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-outline-danger ms-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: 'success',
  //         title: 'Suspended!',
  //         text: 'User has been suspended.',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: 'Cancelled',
  //         text: 'Cancelled Suspension :)',
  //         icon: 'error',
  //         customClass: {
  //           confirmButton: 'btn btn-success'
  //         }
  //       })
  //     }
  //   })
  // }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section pb-4">
            <div className="d-flex align-items-center flex-column p-1">
                <Avatar img={avatarImg} className="w-[100px]" size="xl"/>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-2 mb-1 d-flex justify-content-center">{TitleDetails}</h4>
          <div className="d-flex justify-content-center gap-1 align-items-center pt-2 pb-2">
            <Button
              color="primary"
              // onClick={() => setShow(true)}
            >
              ادیت اخبار
            </Button>
            <Button
              color="danger"
              outline
              // onClick={handleSuspendedClick}
            >
              حذف اخبار
            </Button>
              <Switch />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserInfoCard;
