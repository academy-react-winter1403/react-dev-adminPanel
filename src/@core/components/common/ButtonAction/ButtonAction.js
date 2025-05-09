import { Archive, Edit, FileText, MoreVertical, Trash, Trash2 } from "react-feather";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

const ButtonAction = () => {
  return (
    <div className="column-action">
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            // tag={Link}
            className="w-100"
            // to={`/apps/user/view/${row.id}`}
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className="me-50" />
            <span className="align-middle">Details</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            // onClick={(e) => e.preventDefault()}
          >
            <Archive size={14} className="me-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="/"
            className="w-100"
            onClick={(e) => {
            //   e.preventDefault();
            //   store.dispatch(deleteUser(row.id));
            }}
          >
            <Trash2 size={14} className="me-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
export default ButtonAction;
