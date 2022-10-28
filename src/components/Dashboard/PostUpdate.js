import axios from "axios";
import React from "react";

const baseURL = "http://localhost:3001";

export default function App() {
  const [request, setRequest] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/api/v1/requests`).then((response) => {
        setRequest(response.data);
    });
  }, []);

  const updateRequest = async (id, e) => {
    //e.preventDefault();
    let data = await axios.put(`${baseURL}/api/v1/requests/${id}`)
    setRequest(); 
  }

  if (!request) return "No Requests!"

  return (
    <div>
      <h1>{request.address}</h1>
      <p>{request.description}</p>
      <button onClick={updateRequest}>Update Request</button>
    </div>
  );
}