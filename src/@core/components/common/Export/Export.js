import { Card, Table } from "reactstrap";
import ButtonAction from "../ButtonAction/ButtonAction";

const Export = ({
  title,
  Feature,
  Status,
  dataMap = [],
  fieldKeys = {
    image: "img",
    title: "titleNews",
    feature: "FeatureNews",
    status: "StatusNews"
  }
}) => {
  return (
    <Table className="table-hover-animation mt-2" responsive>
      <thead>
        <tr>
          <th>{title}</th>
          <th></th>
          <th>{Feature}</th>
          <th>{Status}</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        {dataMap.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <img src={item[fieldKeys.image]} />
                {item[fieldKeys.title]}
              </td>
              <td></td>
              <td>{item[fieldKeys.feature]}</td>
              <td>{item[fieldKeys.status]}</td>
              <td>
                <ButtonAction />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default Export;
