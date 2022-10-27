import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = `http://localhost:3001`


function Users () {

  const [item, setItem] = useState<null | []>(null);

  const getData = async () => {
    const response = await axios.get(
      `${baseUrl}/api/v1/users`
    );
    setItem(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

      return (
        <h1>Users</h1>
        )

}

export default Users; 