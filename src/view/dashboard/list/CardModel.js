import { Card, CardBody, CardText, Button } from "reactstrap";

// ** Images
// import medal from '@src/assets/images/illustration/badge.svg'
import pic from "../../../@core/assets/photos/badge.svg";

const CardMedal = ({ userName, paymentCost }) => {
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h1>{`${userName} جان 🎉`}</h1>
        <h3 style={{ marginTop: "20px" }}> خوش اومدی😍😍 </h3>
        <h4 style={{marginTop: "62px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px"}}>
          <span> مجموع تمام پرداختی های تیم </span>
          <span style={{ fontWeight: "bold" }}>React-Dev</span>
          <span> {` به مقدار ${paymentCost} تومان رسیده `} </span>
        </h4>
        <img className="congratulation-medal" src={pic} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
