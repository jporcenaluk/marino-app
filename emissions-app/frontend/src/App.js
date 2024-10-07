import React, { useEffect, useState } from 'react';
import TransportationForm from './components/TransportationForm';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the backend API
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>{message ? message : 'Loading...'}</h1>
      <TransportationForm />
    </div>
  );
}

export default App;
