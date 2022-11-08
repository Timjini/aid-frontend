// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import { API_FULFILLMENTS } from '../../constant';
// import ActionCable from 'actioncable';




// class Fulfillment extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       fulfillments: []
//     }
//     this.cable = ActionCable.createConsumer('ws://localhost:3001/cable')
//   }

//   componentDidMount() {
//     this.fetch()
//     this.createSubscription()
//   };

//   fetchMessages = () => {
//     fetch(`${API_FULFILLMENTS}`)
//       .then(res => res.json())
//       .then(fulfillments => this.setState({ fulfillments: fulfillments }));
//   }

//   createSubscription = () => {
//     this.cable.subscriptions.create(
//       { channel: 'FulfillmentsChannel' },
//       { received: fulfillment => this.handleReceivedFulfillments(fulfillment) }
//     )
//   }

//   mapMessages = () => {
//     return this.state.fulfillments.map((fulfillment, i) => 
//       <li key={i}>{fulfillment.text}</li>)
//   }

//   handleReceivedFulfillment = fulfillment => {
//     this.setState({ fulfillments: [...this.state.fulfillments, fulfillment] })
//   }

//   handleFulfillmentSubmit = e => {
//     e.preventDefault();
//     const fulfillmentObj = {
//       fulfillment: {
//         content: e.target.fulfillment.value
//       }
//     }
//     const fetchObj = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(fulfillmentObj)
//     }
//     fetch('http://localhost:3001/api/v1/fulfillments', fetchObj)
//     e.target.reset()
//   }

//   render() {
//     return (
//       <div className='App'>
//         <ActionCable 
//           channel={{ channel: 'FulfillmentsChannel' }}
//           onReceived={this.handleReceivedFulfillment}
//         />
//         <h2>Messages</h2>
//         <ul>{this.mapFulfillments()}</ul>
//         <form>
//           <input name='message' type='text' />
//           <input type='submit' value='Send message' />
//         </form>
//       </div>
//     );
//   }
// }

// export default Fulfillment; 