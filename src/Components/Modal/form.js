import React, { Component } from 'react';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';

class FormExampleFieldControlId extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {},
      name: '',
      bio: '',
      needs: ''
    }

    this.updateLocation = this.updateLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateLocation(location) {
    this.setState({ location });
  }

  handleChange(e, {name, value}) {
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault();
    // Sends form values to map component
    this.props.handleSubmit(this.state);
    // Closes the form modal
    this.props.handleClose();
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field>
            <Form.Input label='Name' placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange} />
          </Form.Field>
          <div className='field'>
            <label>Location</label>
            <input ref={this.handleRef} label='Location' placeholder='Location' />
          </div>
        </Form.Group>
        <Form.Field>
          <Form.TextArea label='Bio' placeholder='Bio' name='bio' value={this.state.bio} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <Form.TextArea label='Basic Needs' placeholder='Basic Needs' name='needs' value={this.state.needs} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field
          id='form-button-control-public'
          control={Button}
          content='Confirm'
        />
      </Form>
    );
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    const { google } = this.props;
    if (!google) return;
    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.updateLocation(location);
    });
  }

  handleRef = (c) => {
    this.autocomplete = c;
  }
}

export default FormExampleFieldControlId