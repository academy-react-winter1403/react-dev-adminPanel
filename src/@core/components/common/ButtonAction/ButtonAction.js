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
import "../../../../@core/scss/me-style/font.scss";

const ButtonAction = ({ dataArray, itemClickHandle, leftPosNum }) => {
  return (
    // <div className="column-action">
    <UncontrolledDropdown
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DropdownToggle
        tag="div"
        className="btn btn-sm flex flex-row justify-content-center"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MoreVertical size={14} className="cursor-pointer" />
      </DropdownToggle>
      {/* <div style={{ position: "relative", left: leftPosNum }}> */}
        <DropdownMenu style={{position: "absolute", transform: "translate3d(93.6px, 0px, 0px)"}}>
          {dataArray.map((item, index) => {
            return (
              <DropdownItem
                className="w-100 d-flex gap-1"
                onClick={() => itemClickHandle(item)}
                key={index}
                style={{display: "flex", gap: "10px"}}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="align-middle">{item.title}</span>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      {/* </div> */}
    </UncontrolledDropdown>
    // </div>
  );
};
export default ButtonAction;
