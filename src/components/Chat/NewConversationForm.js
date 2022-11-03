import React from 'react';
import { API_ROOT, HEADERS } from '../../constant/index';

class NewConversationForm extends React.Component {
  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: ''})
    .then((data) => {
      console.log(data)
    })
  };

  render = () => {
    return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
        <div className="newConversationForm">
          <form onSubmit={this.handleSubmit}>
            <label>New Conversation:</label>
            <br />
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange}  
              className="form-control"
            />
            <button type="submit" className='btn btn-success'>Send</button>
          </form>
          </div>
        </div>
      </div>
    </div>
    );
  };
}

export default NewConversationForm;