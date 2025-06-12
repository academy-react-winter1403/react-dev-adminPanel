// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const TableFilter = ({
  data,
  sectionTitle,
}) => {
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{sectionTitle}</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {data.map((item) => {
              return (
                <Col md="4">
                  <Label for="role-select">{item.title}</Label>
                  <Select
                    isClearable={false}
                    value={item.state}
                    options={item.options}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(data) => {
                      item.onChange(data);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default TableFilter;
