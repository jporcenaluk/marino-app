import TransportationForm from '../components/TransportationForm';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const USER_ID_KEY = 'user_id';
  const navigate = useNavigate();

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

  const handleFormSubmit = async (formData: any) => {
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
      const data = await response.json()
      if (response.ok) {
        console.log('Success:', data);
        navigate('/story/1')
      } else {
        console.log('Error:', data);
        console.error('API call failed')
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>Marino Maths Week</h1>
      <TransportationForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default HomePage;
