import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import base from '../../rebase';
import Modal from '../Modal/';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      position: {
        lat: 41.154885,
        lng: -88.081807,
      }
    };
    this.fetchPlaces = this.fetchPlaces.bind(this);
    // this.addPerson = this.addPerson.bind(this);
  }
  handleSubmit(formState) {
    let immediatelyAvailableReference = base.push('people', {
      data: { ...formState }
    }).then(newLocation => {
      let personKey = newLocation.key;
      let location = formState.location;
      location = location.lat.toString().replace('.', '_') + ' ' + location.lng.toString().replace('.', '_');
      console.log('location is:', location);
      base.post('/locations/'+location, {
        data: { personKey }
      }).then(locLocation => {
        console.log('added loc at:', locLocation);
      })
    }).catch(err => {
      console.log(err);
    });
    //available immediately, you don't have to wait for the Promise to resolve
    // var generatedKey = immediatelyAvailableReference.key;
    console.log(immediatelyAvailableReference.key);
  }

  // addPerson(formState) {
  //   let immediatelyAvailableReference = base.push('people', {
  //     data: { ...formState }
  //   }).then(newLocation => {
  //     let personKey = newLocation.key;
  //     let location = this.locToString(formState.location);
  //     base.push(`locations/${location}`, {
  //       data: { personKey }
  //     }).then(locLocation => {
  //       console.log('added loc at:', locLocation);
  //     })
  //   }).catch(err => {
  //     console.log(err);
  //   });
  //   //available immediately, you don't have to wait for the Promise to resolve
  //   // var generatedKey = immediatelyAvailableReference.key;
  //   console.log(immediatelyAvailableReference.key);
  // }

  // locToString(locObj) {
  //   return locObj.lat.toString() + ' ' + locObj.lng.toString();
  // }
  // strToLoc = str => {
  //   const { lat, lng } = str.split(' ')
  //   return {lat, lng};
  // }


  fetchPlaces(mapProps, map) {
    this.map = map;
    const { locations } = mapProps;
    console.log(locations);
    const markers = [];
    for (var i = 0; i < locations.length; i++) {
      var marker = <Marker
        title={'The markers title will appear as a tooltip.'}
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

      this.setState({ position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      } });
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
          <Modal 
            google={this.props.google}
            map={this.map}
            handleSubmit={this.handleSubmit}
          />
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />

            <input type="submit" value="Go" />
          </form>

          <div>
            <div>Lat: {position && position.lat}</div>
            <div>Lng: {position && position.lng}</div>
          </div>
        </div>
        <Map
          {...this.props}
          google={this.props.google}
          initialCenter={this.state.positi}
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