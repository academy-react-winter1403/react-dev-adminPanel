import { useNavigate, useParams } from "react-router-dom";
import { Card, Table } from "reactstrap";
import ButtonAction from "../ButtonAction/ButtonAction";
import { getNewsDetailData } from "../../../services/api";
import { useSelector } from "react-redux";

const Export = ({
  hasImage,
  headers = [],
  dataMap = [],
  fieldKeys = [],
  imageField = "image",
  titleField = "title",
  Btn,
  clickHandle,
}) => {
  const navigate = useNavigate();
  // const { mutate } = getNewsDetailData("getNewsDetailData");

  // const { id } = useParams()
  // const { PageNumber, RowsOfPage, SortingCol, SortType, Query, IsActive } =
  //   useSelector((state) => state.NewsListFilterSlice);

  const onRowClick = (itemId) => {
    // console.log(itemId)
    clickHandle(itemId)
  };

  return (
    <Table className="table-hover-animation mt-2" responsive>
      <thead>
        <tr>
          {headers.map((nameItem, index) => {
            return <th key={index}>{nameItem}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataMap.map((item, index) => {
          return (
            <tr
              key={index}
              onClick={() => onRowClick(item)}
            >
              {hasImage ? (
                <>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <img
                        src={item[imageField]}
                        className="rounded-circle"
                        alt="Avatar"
                        style={{ width: "50px", height: "50px" }}
                      />
                      {item[titleField]}
                    </div>
                  </td>
                </>
              ) : (
                <td>{item[titleField]}</td>
              )}
              {fieldKeys.map((titleItem, index) => {
                return <td key={index}>{item[titleItem]}</td>;
              })}
              <td>
                {Btn}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default Export;
