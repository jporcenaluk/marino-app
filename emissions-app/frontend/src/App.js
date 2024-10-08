import React, { useEffect, useState } from 'react';
import TransportationForm from './components/TransportationForm';

function App() {
  const [message, setMessage] = useState('');
  const USER_ID_KEY = 'user_id';

  useEffect(() => {
    // Fetch the backend API
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getUserId = () => {
    let id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
  };

  const getTzIdentifier = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const handleFormSubmit = async (formData) => {
    // Get Metadata
    const tzIdentifier = getTzIdentifier();
    const userId = getUserId();

    // Combine form data and metadata
    const payload = {
      ...formData,
      user_id: userId,
      tz_identifier: tzIdentifier,
    }

    // Send to API
    try {
      const response = await fetch('/api/transport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>{message ? message : 'Loading...'}</h1>
      <TransportationForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default App;
