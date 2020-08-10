import React, { useState, useEffect, useCallback } from "react";
import "./Main.css";
import Location from "../Location";
import LocalDate from "../Localdate";
import SunTimes from "../SunTimes";
import { getSunrise, getSunset } from 'sunrise-sunset-js';

export const Main = () => {
  const [userPosition, setUserPosition] = useState({});
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  // const [userLocation, setUserLocation] = useState("UNKNOWN")
  const [localDate, setLocalDate] = useState([0, 0, 0]);
  const [localTime, setLocalTime] = useState([0, 0, 0]);
  const [sunrise, setSunrise] = useState("-calculating-");
  const [sunset, setSunset] = useState("-calculating-");

  const getUserPosition = useCallback(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserPosition(position);
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
        console.log(position);
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  const getDateTime = useCallback(() => {
    let today = new Date();
    setLocalDate([today.getDate(), today.getMonth(), today.getFullYear()]);
    setLocalTime([today.getHours(), today.getMinutes(), today.getSeconds()]);
  }, [])

  const getSunTimes = useCallback(() => {
    setSunrise(getSunrise(userLatitude, userLongitude));
    setSunset(getSunset(userLatitude, userLongitude));
  }, [userLatitude, userLongitude])

  // const getAddress = useCallback((latitude, longitude) => {
  //   return new Promise(function (resolve, reject) {
  //     const request = new XMLHttpRequest();
  //     const method = 'GET';
  //     const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
  //     let async = true;

  //     request.open(method, url, async);
  //     request.onreadystatechange = () => {
  //       if (request.readyState == 4) {
  //         if (request.status == 200) {
  //           const data = JSON.parse(request.responseText);
  //           const address = data.results[0];
  //           resolve(address);
  //         }
  //         else {
  //           reject(request.status);
  //         }
  //       }
  //     };
  //     request.send();
  //   });
  // }, []);

  // const getCity = useCallback((latitude, longitude) => {
  //   const xhr = new XMLHttpRequest();
  //   let lat = latitude;
  //   let lng = longitude;

  //   // Paste your LocationIQ token below. 
  //   xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=" + lat + "&lon=" + lng + "&format=json", true);
  //   xhr.send();
  //   xhr.onreadystatechange = processRequest;
  //   xhr.addEventListener("readystatechange", processRequest, false);

  //   function processRequest(e) {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //       let response = JSON.parse(xhr.responseText);
  //       let city = response.address.city;
  //       console.log(city);
  //       return;
  //     }
  //   }
  // }, []);

  // const getUserLocation = useCallback(() => {
  //   setUserLocation(getAddress(userPosition.latitude, userPosition.longitude))
  //   console.log('userLocation: ', getAddress(userPosition.latitude, userPosition.longitude));
  //   console.log('userLocation: ', getAddress(userPosition.latitude, userPosition.longitude).then(console.log).catch(console.error));
  //   console.log('userLocation: ', getAddress(51.319466999999996, -2.1782705));
  //   console.log('userLocation: ', getCity(51.319466999999996, -2.1782705));
  // }, []);

  // getAddress(userPosition.latitude, userPosition.longitude).then(console.log).catch(console.error);

  useEffect(() => {
    getUserPosition();
    getDateTime();
    getSunTimes()
  }, [getUserPosition, getDateTime, getSunTimes]);

  // useEffect(() => {
  //   getUserLocation();
  // }, [getUserLocation]);

  return (
    <div className="main">
      <Location userLocation={`${userLatitude}, ${userLongitude}`} ></Location>
      <LocalDate localDate={localDate} localTime={localTime} ></LocalDate>
      <SunTimes sunrise={sunrise} sunset={sunset} ></SunTimes>
    </div>
  );
};

export default Main;
