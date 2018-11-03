import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      position: null,
    }
    this.fetchPlaces = this.fetchPlaces.bind(this);
  }


  fetchPlaces(mapProps, map) {
    this.map = map;
    const { locations } = mapProps;
    console.log(locations);
    const markers = [];
    for (var i = 0; i < locations.length; i++) {
      var marker = <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={locations[i]}
        key={i}
      />
      markers.push(marker);
    }
    this.setState({ markers })
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google } = this.props;
    const map = this.map;

    console.log('render???', google, map);
    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      console.log('changed');
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }

  render() {
    const { position } = this.state;
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.props.locations.length; i++) {
      bounds.extend(this.props.locations[i]);
    }
    return (
      <div className='app'>
        <div className='sidebar'>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />

            <input type="submit" value="Go" />
          </form>

          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>
        <Map
          {...this.props}
          google={this.props.google}
          initialCenter={this.props.center}
          zoom={14}
          onReady={this.fetchPlaces}
          locations={this.props.locations}
          bounds={bounds}
          containerStyle={{
            height: '100vh',
            position: 'relative',
            width: '50%',
          }}
          className='map'
        >
          {this.state.markers}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDeEYKXdSP2fILuquzzevImbFLr0D6LIWE'
})(MapView)