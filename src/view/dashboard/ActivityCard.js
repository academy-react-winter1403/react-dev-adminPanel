import { Card, CardBody, CardFooter, CardHeader, Col } from "reactstrap";
import Chart from "react-apexcharts";

const ActivityCard = ({ title, percentageNumber, bText1, bText2 }) => {
  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: ["#5751E1"],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "77%",
        },
        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            color: "#5e5873",
            fontFamily: "Montserrat",
            fontSize: "2.86rem",
            fontWeight: "600",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
  };
  // series = [isNaN(focusItemPercent) ? 0 : focusItemPercent];

  return (
    // <Col style={{ display: "flex", justifyContent: "space-around" }}>
    <Card className="p-1 px-0 pb-0" style={{ width: "30%" }}>
      <CardHeader>
        <label>{title}</label>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={[percentageNumber]}
          type="radialBar"
          height={245}
        />
      </CardBody>
      <CardFooter
        className="m-0 p-0"
        style={{
          width: "100%",
          borderTop: "1px solid rgb(0 0 0)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="p-1"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid rgb(0 0 0)"
          }}
        >
          <p className="m-0" style={{ fontSize: "17px" }}>{bText1}</p>
          <label style={{ fontSize: "20px" }}>40</label>
        </div>
        <hr
          className="p-0 m-0"
          style={{
            outline: "none",
            border: "none",
            width: "1px",
            height: "100%",
            background: "#000",
          }}
        />
        <div
          className="p-1"
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className="m-0" style={{ fontSize: "17px" }}>{bText2}</p>
          <label style={{ fontSize: "20px" }}>40</label>
        </div>
      </CardFooter>
    </Card>
    // </Col>
  );
};

export default ActivityCard;
