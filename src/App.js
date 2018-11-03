import React, { Component } from 'react';
import MapView from './Components/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <MapView center={{
        lat: 40.854885,
        lng: -88.081807
      }}/>
    );
  }
}

export default App;
