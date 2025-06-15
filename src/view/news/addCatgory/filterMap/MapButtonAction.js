import { CheckCircle, Edit, FileText, XCircle } from "react-feather";

export const MapButtonAction = [
  { title: "جزئیات", icon: <FileText size={20} /> },
  { title: "ویرایش", icon: <Edit size={20} /> },
];
export const MapButtonStatus = [
  { title: "تایید", icon: <CheckCircle size={20} /> },
  { title: "حذف", icon: <XCircle size={20} /> },
];
export const MapButtonStatusBuilding = [
  { title: "تغیر وضعیت", icon: <CheckCircle size={20} /> },
  { title: "ویرایش", icon: <XCircle size={20} /> },
];
