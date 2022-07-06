import React, { useState, useEffect } from "react";

let index = 0;
let id;
let options;

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

const Home = () => {
  const [position, setPosition] = useState([0, 0]);
  function success(pos) {
    const crd = pos.coords;
    setPosition([crd.latitude, crd.longitude]);
    index++;
  }
  useEffect(() => {
    id = navigator.geolocation.watchPosition(success, error, options);
    setTimeout(() => {
      navigator.geolocation.clearWatch(id);
    }, 30000);
  }, []);

  return (
    <div>
      Home
      <div>index: {index}</div>
      <div>Lat: {position[0]}</div>
      <div>Long: {position[1]}</div>
    </div>
  );
};

export default Home;
