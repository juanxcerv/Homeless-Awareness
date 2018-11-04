import React, { Component } from 'react';
import MapView from './Components/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <MapView 
            locations = {[
              { lat: 41.154885, lng: -88.081807},
              { lat: 41.24885, lng: -88.781807},
              { lat: 41.454885, lng: -88.181807},
              { lat: 41.554885, lng: -88.21807}
            ]}
            />
        </div>
      </div>
    );
  }
}

export default App;
