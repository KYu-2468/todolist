import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "./mleaflet.css";

let index = 0;
let id;
let options;

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const Home = () => {
  const [position, setPosition] = useState([]);
  const [polyline, setPolyline] = useState([[32.8383936, -117.130796815]]);
  // const polyline = [
  //   [51.505, -0.09],
  //   [51.51, -0.1],
  //   [51.51, -0.12],
  // ];
  function success(pos) {
    const crd = pos.coords;
    // const plines = [...polyline, [crd.latitude, crd.longitude]];
    setPosition([crd.latitude, crd.longitude]);
    // console.log("before: ", polyline);
    setPolyline((pol) => [...pol, [crd.latitude, crd.longitude]]);
    // console.log("pol: ", polyline);
    // console.log("plines: ", plines);
    index++;
  }
  useEffect(() => {
    id = navigator.geolocation.watchPosition(success, error, options);
    setTimeout(() => {
      navigator.geolocation.clearWatch(id);
    }, 60000);
  }, []);
  const limeOptions = { color: "lime" };
  if (!position.length) return <div>No Location!</div>;

  return (
    <div>
      Home
      <div>index: {index}</div>
      <div>Lat: {position[0]}</div>
      <div>Long: {position[1]}</div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
};

export default Home;
