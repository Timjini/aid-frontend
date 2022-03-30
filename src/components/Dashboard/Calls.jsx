// import {Component} from 'react';
// import axios from 'axios';

// const api = axios.create({
//     baseURL: `http://localhost:3001/api/v1/requests`
// })


// class Calls extends Component {
//     state ={ 
//         requests: []
//     }

//     constructor(){
//         super();
//         api.get('/').then(res => {
//             console.log(res.data)

//         })
//     }

//     render(){
//         return(
//             <>
//             {this.state.requests.map(request => 
//                 <h1 key={request.id}>{request.address}</h1>
//                 )}
//             </>
//         )
//     }
// }


// export default Calls;

// import React, { useRef, useState } from "react";
// function Calls() {
//   const baseURL = "http://localhost:3001/api/v1/requests";
//   const id = useRef(null);
//   const description = useRef(null);
//   const address = useRef(null);
//   const [putResult, setPutResult] = useState(null);
//   const fortmatResponse = (res) => {
//     return JSON.stringify(res, null, 2);
//   }
  
//   async function putData() {
//     const id = id.current.value;
//     if (id) {
//       const putData = {
//         address: address.current.value,
//         description: description.current.value,
//       };
//       try {
//         const res = await fetch(`${baseURL}/${id}`, {
//           method: "put",
//           headers: {
//             "Content-Type": "application/json",
//             "x-access-token": "token-value",
//           },
//           body: JSON.stringify(putData),
//         });
//         if (!res.ok) {
//           const message = `An error has occured: ${res.status} - ${res.statusText}`;
//           throw new Error(message);
//         }
//         const data = await res.json();
//         const result = {
//           status: res.status + "-" + res.statusText,
//           headers: { "Content-Type": res.headers.get("Content-Type") },
//           data: data,
//         };
//         setPutResult(fortmatResponse(result));
//       } catch (err) {
//         setPutResult(err.message);
//       }
//     }
//   }
  
//   const clearPutOutput = () => {
//     setPutResult(null);
//   }
  
//   return (
//     <div className="card">
//       <div className="card-header">Update request</div>
//       <div className="card-body">
//       <div className="form-group">
//           <input type="text" className="form-control" ref={address} placeholder="Address" />
//         </div>
//         <div className="form-group">
//           <input type="text" className="form-control" ref={description} placeholder="Description" />
//         </div>
//         <button className="btn btn-sm btn-primary" onClick={putData}>Update Data</button>
//         <button className="btn btn-sm btn-warning ml-2" onClick={clearPutOutput}>Clear</button>
//         { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
//       </div>
//     </div>
//   );
// }
// export default Calls;