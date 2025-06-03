import {
  Archive,
  Edit,
  FileText,
  MoreVertical,
  Trash,
  Trash2,
} from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const ButtonAction = ({ dataArray, itemClickHandle }) => {
  return (
    <div className="column-action">
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu>
          {dataArray.map((item, index) => {
            return (
              <DropdownItem
                className="w-100"
                onClick={() => itemClickHandle(item)}
                key={index}
              >
                <span>
                  {item.icon}
                </span>
                <span className="align-middle">{item.title}</span>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
export default ButtonAction;
