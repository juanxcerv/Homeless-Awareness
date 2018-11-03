import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    }
  }
  fetchPlaces(mapProps, map) {
    const {locations} = mapProps;
    const markers = [];
    for(var i = 0; i < locations.length; i++) {
      var marker = <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={locations[i]} 
      />
      markers.push(marker);
    }
    this.setState({markers})
  }
  render() {
    return (
      <Map 
        google={this.props.google} 
        initialCenter = {this.props.center} 
        zoom={14} 
        onReady={this.fetchPlaces}
        bounds={this.props.locations}
      >
        {this.state.markers} 
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDeEYKXdSP2fILuquzzevImbFLr0D6LIWE'
})(MapView)

