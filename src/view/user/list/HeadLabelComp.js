import React from "react";
import { CardBody, CardHeader, Col, Row } from "reactstrap";

const HeadLabelComp = ({ children }) => {
  return (
    <table className="table table-hover w-100 p-0 m-0">
      <thead className="text-center w-100 p-0 m-0">
        <tr className="w-100 px-0 m-0">
          <th style={{display: "flex"}}>
            {children}
          </th>
        </tr>
      </thead>
    </table>
  );
};

export default HeadLabelComp;
