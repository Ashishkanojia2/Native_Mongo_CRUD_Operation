import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const App = () => {
  const [users, setUsers] = useState([]);

  // const creatinguser = async () => {
  //   try {
  //     const user = await fetch('http://10.0.2.2:3000/create', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         name: '@naruto',
  //         username: 'narutoBhai',
  //         email: 'naruto121@gmail.com',
  //       }),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     })
  //       .then(user => user.json())
  //       .then(json => console.log(json));
  //   } catch (error) {
  //     console.log('Ye Error Suer Ko Create Krne Se aa rehi hai ', error);
  //   }
  // };

  const creatinguser = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/create', {
        method: 'POST',
        body: JSON.stringify({
          name: 'admin',
          username: 'admin',
          email: 'admin@gmail.com',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => {
          response.json();
        })
        .then(data => {
          console.log('data kay kheraha hai', data);
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };
  const updateinguser = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/update', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Dr.JaneFoster',
          username: 'Dr.JaneFoster',
          email: 'WomenThor@gmail.com',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => {
          response.json();
        })
        .then(data => {
          console.log('data kay kheraha hai', data);
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };
  // const deleteuser = async () => {
  //   const deleteuserdata = await fetch('http://10.0.2.2:3000/delete', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: 'admin@gamil.com',
  //     }),
  //     headers: {'Content-type': 'application/json ; charset=UTF-8'},
  //   })
  //     .then(response => {
  //       response.json();
  //     })
  //     .then(data => {
  //       console.log('data kay kheraha hai', data);
  //     });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const json = await response.json();
  //   console.log(json);
  //   console.log(' ye raha delete userdata', deleteuserdata);
  // };

  //

  const deleteuser = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/delete', {
        method: 'POST',
        body: JSON.stringify({
          email: 'admin@gmail.com', // Assuming this is a valid email to delete
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
      });

      const data = await response.json(); // Parse the JSON response
      console.log('Data received from server:', data);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  useEffect(() => {
    // THIS FUNCTION IS PERFORMING WELL
    // creatinguser();
    // updateinguser();
    // deleteuser();
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/users');
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Users:</Text>
      {users.map(user => (
        <Text key={user._id}>{user.name}</Text>
      ))}
    </View>
  );
};

export default App;
