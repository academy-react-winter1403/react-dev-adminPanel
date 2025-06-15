import { useNavigate, useParams } from "react-router-dom";
import { Card, Table } from "reactstrap";
import ButtonAction from "../ButtonAction/ButtonAction";
import { getNewsDetailData } from "../../../services/api";
import { useSelector } from "react-redux";
import { useState } from "react";

const Export = ({
  hasImage,
  headers = [],
  dataMap = [],
  fieldKeys = [],
  imageField = "image",
  titleField = "title",
  Btn,
  clickHandle,
  btnOnClick,
  hover,
  statusName,
  statusKey,
}) => {
  const navigate = useNavigate();
  // const { mutate } = getNewsDetailData("getNewsDetailData");

  // const { id } = useParams()
  // const { PageNumber, RowsOfPage, SortingCol, SortType, Query, IsActive } =
  //   useSelector((state) => state.NewsListFilterSlice);

  const onRowClick = (itemId) => {
    // console.log(itemId)
    clickHandle(itemId);
  };

  return (
    <div>
      {hover ? (
        <Table className="table-hover-animation mt-2" responsive hover>
          <thead className="w-100">
            <tr className="w-100">
              {headers.map((nameItem, index) => {
                return <th key={index}>{nameItem}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {dataMap.map((item, index) => {
              return (
                <tr key={index} onClick={() => onRowClick(item)}>
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
                    <td>
                      {item[titleField]
                        ? item[titleField]
                        : "ای بابا اسم نداره کهههه😒😒"}
                    </td>
                  )}
                  {fieldKeys.map((titleItem, index) => {
                    const typeOfStatus =
                      typeof titleItem === "object" ? true : false;
                    const keyName = titleItem.keyName;
                    return (
                      <td key={index}>
                        {typeOfStatus ? (
                          item[statusName] ? (
                            <span className="me-1 badge bg-light-primary px-1">
                              {keyName
                                ? statusKey[keyName].trueField
                                : statusKey.trueField}
                            </span>
                          ) : (
                            <span className="me-1 badge bg-light-danger px-1">
                              {keyName
                                ? statusKey[keyName].falseField
                                : statusKey.falseField}
                            </span>
                          )
                        ) : item[titleItem] || item[titleItem] == 0 ? (
                          item[titleItem]
                        ) : (
                          "ای بابا اسم نداره کهههه😒😒"
                        )}
                      </td>
                    );
                  })}
                  <td>
                    {/* <div onClick={() => btnOnClick(item)}>{Btn}</div> */}
                    {typeof Btn === 'function' ? <Btn item={item} /> : Btn}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Table className="table-hover-animation mt-2" responsive>
          <thead className="w-100">
            <tr className="w-100">
              {headers.map((nameItem, index) => {
                return <th key={index}>{nameItem}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {dataMap.map((item, index) => {
              return (
                <tr key={index} onClick={() => onRowClick(item)}>
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
                    <td>
                      {item[titleField]
                        ? item[titleField]
                        : "ای بابا اسم نداره کهههه😒😒"}
                    </td>
                  )}
                  {fieldKeys.map((titleItem, index) => {
                    const typeOfStatus =
                      typeof titleItem === "object" ? true : false;
                    const keyName = titleItem.keyName;
                    return (
                      <td key={index}>
                        {typeOfStatus ? (
                          item[statusName] ? (
                            <span className="me-1 badge bg-light-primary px-1">
                              {keyName
                                ? statusKey[keyName].trueField
                                : statusKey.trueField}
                            </span>
                          ) : (
                            <span className="me-1 badge bg-light-danger px-1">
                              {keyName
                                ? statusKey[keyName].falseField
                                : statusKey.falseField}
                            </span>
                          )
                        ) : item[titleItem] || item[titleItem] == 0 ? (
                          item[titleItem]
                        ) : (
                          "ای بابا اسم نداره کهههه😒😒"
                        )}
                      </td>
                    );
                  })}
                  <td>
                    {/* <div onClick={() => btnOnClick(item)}>{Btn}</div> */}
                    {typeof Btn === 'function' ? <Btn item={item} /> : Btn}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default Export;
