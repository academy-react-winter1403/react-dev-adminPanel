// import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
// import { useDispatch } from 'react-redux';
// import { setLocation } from '../store/locationSlice';

// const LocationMarker = () => {
//   const dispatch = useDispatch();

//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       dispatch(setLocation({ latitude: lat, longitude: lng }));
//     },
//   });

//   return null;
// };

// const MapSelector = () => {
//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <MapContainer center={[35.6892, 51.3890]} zoom={13} style={{ height: '100%', width: '100%' }}>
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapSelector;





// MapPicker.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/locationSlice"; // مسیر درست رو تنظیم کن
import "leaflet/dist/leaflet.css";

// رفع مشکل آیکون مارکر در Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector((state) => state.location);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      dispatch(setLocation({ latitude: lat, longitude: lng }));
    },
  });

  return latitude && longitude ? (
    <Marker position={[latitude, longitude]}></Marker>
  ) : null;
};

const MapPicker = () => {
  return (
    <MapContainer
      center={[35.6892, 51.3890]} // مختصات پیش‌فرض (تهران)
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;
