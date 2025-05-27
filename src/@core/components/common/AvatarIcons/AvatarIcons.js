// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { GitHub, Calendar, Inbox, Camera, Award, Star } from 'react-feather'

const AvatarIcons = ({iconSource}) => {
  return (
    <div className='demo-inline-spacing position-absolute top-0 end-0'>
      <Avatar color='light-info' icon={iconSource} />
    </div>
  )
}
export default AvatarIcons


      // {/* <Avatar color='primary' icon={<Calendar size={14} />} />
      // <Avatar color='secondary' icon={<GitHub size={14} />} /> */}
      // {/* <Avatar color='success' icon={<Inbox size={14} />} />
      // <Avatar color='light-danger' icon={<Camera size={14} />} />
      // <Avatar color='light-warning' icon={<Award size={14} />} /> */}