// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import { Users } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";
import { name } from "react-date-object/calendars/julian";

const UserActiveCard = ({ title, counter }) => {
  // ** State
  //   const [data, setData] = useState(null)

  //   useEffect(() => {
  //     axios.get('/card/card-statistics/subscribers').then(res => setData(res.data))
  //     return () => setData(null)
  //   }, [])

  const data = {
    analyticsData: {
        subscribers: counter,
    },
    series: [
        {name: "Subscribers", data: [28, 40, 36, 52, 38, 60, 55]}
    ],
  };

  return (
    <StatsWithAreaChart
        style={{height: "285px"}}
      icon={<Users size={21} />}
      color="primary"
      stats={data.analyticsData.subscribers}
      statTitle={title}
      series={data.series}
      type="area"
    />
  );
};

export default UserActiveCard;
