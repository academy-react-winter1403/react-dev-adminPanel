import { PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

Chart.register(...registerables);

const CategorizingUsersByRole = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45,
      },
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 25,
          boxWidth: 9,
        //   color: labelColor,
          usePointStyle: true,
        },
      },
    },
  };

  // ** Chart Data
  const data = {
    labels: ["دانشجو", "ادمین", "استاد", "کاربر عادی", "سایر کاربران"],
    datasets: [
      {
        borderWidth: 0,
        label: "درصد",
        data: [21, 12, 7, 24, 5],
        // backgroundColor: [
        //   successColorShade,
        //   warningColorShade,
        //   infoColorShade,
        //   greyColor,
        //   primary,
        // ],
      },
    ],
  };

//   console.log(usersRolesPercentArray)

  return (
    <Card style={{width: "48%"}}>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">دسته‌بندی کاربران بر اساس نقش</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "350px" }}>
          <PolarArea data={data} options={options} height={350} />
        </div>
      </CardBody>
    </Card>
  );
};

export default CategorizingUsersByRole