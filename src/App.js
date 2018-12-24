import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

import './App.css';

const planetDayList = {
  sundayDay: ["sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn"],
  sundayNight: ["jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury"],
  mondayDay: ["moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun"],
  mondayNight: ["venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter"],
  tuesdayDay: ["mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon"],
  tuesdayNight: ["saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus"],
  wednedayDay: ["mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars"],
  wednesdayNight: ["sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn"],
  thursdayDay: ["jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury"],
  thursdayNight: ["moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun"],
  fridayDay: ["venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter"],
  fridayNight: ["mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon"],
  saturdayDay: ["saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus"],
  saturdayNight:  ["mercury", "moon", "saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars"]
}

// astronomical_twilight_begin: "2018-12-24T13:10:04+00:00"
// astronomical_twilight_end: "2018-12-25T01:44:00+00:00"
// civil_twilight_begin: "2018-12-24T14:17:33+00:00"
// civil_twilight_end: "2018-12-25T00:36:31+00:00"​
// day_length: 33458 ​
// nautical_twilight_begin: "2018-12-24T13:43:15+00:00" ​
// nautical_twilight_end: "2018-12-25T01:10:49+00:00"​
// solar_noon: "2018-12-24T19:27:02+00:00"​
// sunrise: "2018-12-24T14:48:13+00:00"​
// sunset: "2018-12-25T00:05:51+00:00"

class App extends Component {
  makePlantearyHours(long, lat) {
    return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}=today&formatted=0`).then(
      response => response.json(),
      error => console.log("NOPE", error)
    ).then(function(sunData) {
      if (sunData.results) {
        console.log(sunData.results);
        let currentTime = new Date().getTime();
        let sunrise, tempTime = new Date(sunData.results.sunrise).getTime();
        console.log(tempTime)
        let sunset = new Date(sunData.results.sunset).getTime(

        );
        let difference = sunset - sunrise;
        let planetaryDayHourLength = (difference / 1000 / 60 / 12);
        if (currentTime < sunset) {
          let hourCounter = 0;
          while (tempTime < currentTime) {
            tempTime += planetaryDayHourLength;
            hourCounter++;
          }
          console.log(tempTime);
          console.log(hourCounter)
          console.log("The Planteary hour is: " + planetDayList.mondayDay[hourCounter])
        }
      }
    })
  }
  render() {
    return !this.props.isGeolocationAvailable
    ? <div className='App-header'>Your browser does not support Geolocation</div>
    : !this.props.isGeolocationEnabled
    ? <div className='App-header'>Geolocation is not enabled</div>
    : this.props.coords
    ? <div className='App-header'>
      <table>
        <tbody>
          <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
          <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
        </tbody>
      </table>
      <button type="button" onClick={() => this.makePlantearyHours(this.props.coords.longitude, this.props.coords.latitude)}>Clicky</button>
    </div>
    : <div className='App-header'>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);;
