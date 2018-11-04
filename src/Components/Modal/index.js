import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import Form from './form';

class ModalForm extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add Person</Modal.Header>
        <Modal.Content >
          <Form 
            google={this.props.google}
            handleClose={this.handleClose}
            handleSubmit={this.props.handleSubmit}
            />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalForm;