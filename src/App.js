import React, { Component } from 'react';
import MapView from './Components/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <MapView 
            locations = {[]}
            />
        </div>
      </div>
    );
  }
}

export default App;
