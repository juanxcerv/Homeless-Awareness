import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class PersonModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.person!=null}
        onClose={this.props.closePersonInfo}
      >
        <Modal.Header>{this.props.person && this.props.person.name}</Modal.Header>
        <Modal.Content >
          {this.props.person && this.props.person.bio}
        </Modal.Content>
      </Modal>
    );
  }
}

export default PersonModal;