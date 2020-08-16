import React, { useState, useEffect, useCallback } from "react";
import "./Main.css";
import Location from "../Location";
import LocalDate from "../Localdate";
import SunTimes from "../SunTimes";
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import Map from "../Map";
import * as mapkey from "../Map/map.json";   // importing map API key

export const Main = () => {
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [userLocation, setUserLocation] = useState("UNKNOWN")
  console.log('userLocation: ', userLocation);
  const [localDate, setLocalDate] = useState([0, 0, 0]);
  const [localTime, setLocalTime] = useState([0, 0, 0]);
  const [sunrise, setSunrise] = useState("-calculating-");
  const [sunset, setSunset] = useState("-calculating-");
  const [mapKey, setMapKey] = useState();

  // importing map API key
  const getMapKey = useCallback(() => {
    setMapKey(mapkey.APIkey);
  }, [])

  const getUserPosition = useCallback(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
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
    let sunRise = String(getSunrise(userLatitude, userLongitude)).split(" ");
    let sunSet = String(getSunset(userLatitude, userLongitude)).split(" ");

    setSunrise(sunRise[4]);
    setSunset(sunSet[4]);
  }, [userLatitude, userLongitude])

  // logging out city name #1
  // const getAddress = useCallback((latitude, longitude) => {
  //   return new Promise(function (resolve, reject) {
  //     const request = new XMLHttpRequest();
  //     const method = 'GET';
  //     const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
  //     let async = true;

  //     request.open(method, url, async);
  //     request.onreadystatechange = () => {
  //       if (request.readyState === 4) {
  //         if (request.status === 200) {
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

  // logging out city name #2
  const getAddress = useCallback((latitude, longitude) => {
    const xhr = new XMLHttpRequest();
    let lat = latitude;
    let lng = longitude;

    // Paste your LocationIQ token below. 
    xhr.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${mapKey}&lat=${lat}&lon=${lng}&format=json`, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        let city = response.address.city;
        console.log(city);
        return;
      }
    }
  }, [mapKey]);

  const getUserLocation = useCallback(() => {
    setUserLocation(getAddress(userLatitude, userLongitude))
  }, [getAddress, userLatitude, userLongitude]);

  useEffect(() => {
    getUserPosition();
    getDateTime();
    getSunTimes();
    getMapKey();
  }, [getUserPosition, getDateTime, getSunTimes, getMapKey]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <div className="main">
      <div className="infopanel">
        <Location className={"infoitem"} userLocation={`${userLatitude}, ${userLongitude}`} ></Location>
        <LocalDate className={"infoitem"} localDate={localDate} localTime={localTime} ></LocalDate>
        <SunTimes className={"infoitem"} sunrise={sunrise} sunset={sunset} ></SunTimes>
      </div>
      <Map API={mapKey}></Map>
    </div>
  );
};

export default Main;
