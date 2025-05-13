import { Card, Table } from "reactstrap";
import ButtonAction from "../ButtonAction/ButtonAction";

const Export = () => {
  return (
    <Card>
      <Table className="table-hover-animation mt-2" responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Website</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2483</td>
            <td>mahankhodashenas2483@gmail.com</td>
            <td>mahan</td>
            <td>ai</td>
            <td><ButtonAction /></td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
export default Export;
