import { Card } from "reactstrap";
import StatsVertical from "../../@core/components/widgets/stats/StatsVertical";

export const DashboardCard = ({ color, title, desc, item, width, height, gap }) => {
  return (
    <Card
      className="mini-card m-0 p-0"
      style={{
        width: width,
        height: height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: gap
      }}
    >
      <StatsVertical
        color={color}
        icon={<item.icon size={20} className="m-0" />}
        className="m-0 p-0 flex-1"
        cardClassName="m-0"
      />
      <label className="text-1xl">{title}</label>
      <p className="m-0 text-1xl">{desc}</p>
    </Card>
  );
};
