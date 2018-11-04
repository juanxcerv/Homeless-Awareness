import React, { Component } from 'react';
import { Container, Header, Modal } from 'semantic-ui-react';

class PersonModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.person!=null}
        onClose={this.props.closePersonInfo}
      >
      <Container text>
        <Header as='h2'>Name:</Header>
        <p>
          {this.props.person && this.props.person.name}
        </p>
        <Header as='h2'>Bio:</Header>
        <p>
          {this.props.person && this.props.person.bio}
        </p>
        <Header as='h2'>Needs:</Header>
        <p>
          {this.props.person && this.props.person.needs}
        </p>
      </Container>
      </Modal>
    );
  }
}

export default PersonModal;