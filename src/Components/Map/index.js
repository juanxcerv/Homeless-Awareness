import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import base from '../../rebase';
import Modal from '../Modal/';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      position: {
      },
    }
    this.setUpMap = this.setUpMap.bind(this);
  }
  handleSubmit(formState) {
    let immediatelyAvailableReference = base.push('people', {
      data: { ...formState }
    }).then(newLocation => {
      let personKey = newLocation.key;
      let location = formState.location;
      location = location.lat.toString().replace('.', '_') + ' ' + location.lng.toString().replace('.', '_');
      console.log('location is:', location);
      return base.post('/locations/'+location, {
        data: { personKey }
      });
    }).then(locLocation => {
      let location = formState.location;
      location = location.lat.toString().replace('.', '_') + ' ' + location.lng.toString().replace('.', '_');
      console.log('added loc at:', locLocation);
      console.log('before:', location);
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
  strToLoc = str => {
    console.log('srtr', str);
    const location  = str.split(' ');
    
    return {
      lat: parseFloat(location[0].replace('_', '.')),
      lng: parseFloat(location[1].replace('_', '.'))
    };
  }

  setUpMap(mapProps, map) {
    this.map = map;
    this.setState({position: {
      lat: 37.8715926,
      lng: -122.272747
    }})
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
      const place = autocomplete.getPlace();

      if (!place.geometry) return;
      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      //need to get a list of locations from firebase and set state to those
      var proximity_locations = []
      base.fetch('locations', {
        context: this,
        asArray: true,
        then(data){
          console.log(data);
          const loc = data[0].key;
          console.log('unhashed: ', this.strToLoc(loc));
          //call on a function that only gets 20 closest from all locations returned here.
        }
      });
      this.setState({ 
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        locations: {
          proximity_locations,
        }
      });
    });
  }

  render() {
    const { position } = this.state;
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < this.state.locations.length; i++) {
      bounds.extend(this.state.locations[i]);
    }
    var markers = [];
    for (var i = 0; i < this.state.locations.length; i++) {
      var marker = <Marker
      title={'The marker`s title will appear as a tooltip.'}
      name={'SOMA'}
      position={this.state.locations[i]}
      key={i}
      />  
    markers.push(marker);
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
          google={this.props.google}
          initialCenter={{
            lat: 37.8715926,
            lng: -122.272747
          }}
          center={this.state.position}
          zoom={15}
          onReady={this.setUpMap}
          bounds={
            this.props.locations.length > 0 ?
            bounds : 
            undefined}
          containerStyle={{
            height: '100vh',
            position: 'relative',
            width: '50%',
          }}
          className='map'
        >
          {markers}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDeEYKXdSP2fILuquzzevImbFLr0D6LIWE'
})(MapView)