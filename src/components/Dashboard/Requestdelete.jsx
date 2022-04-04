import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


export default class Requestdelete extends React.Component {

    state={
        requests: []
    }

    hanedleChange = e => {
        this.setState ({ id:e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
    axios.delete(`https://hidden-eyrie-18402.herokuapp.com/api/v1/requests/${this.state.id}`)
.then(res => {
  console.log(res)
})

}

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Button type="submit"> Delete</Button>
                </form>
            </div>
        )
    }

    
}
