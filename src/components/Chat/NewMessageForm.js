import React from 'react';
import { API_ROOT, HEADERS } from '../../constant/index';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' });
  };

  render = () => {
    return (

      <div classNameName="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <div className='container'>
            <div className='row'>
              <div className='col-md-10'>
                <input
                  type="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  className="form-control"
                />
                </div>
                <div className='col-md-2'>
                <input type="submit" className='btn btn-primary' />
                </div>
            </div>
          </div>
        </form>
      </div>

    );
  };
}

export default NewMessageForm;