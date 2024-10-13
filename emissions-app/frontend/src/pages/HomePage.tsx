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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Welcome to Maths Week 2024!</h2>
      <div className="mb-8">
        <p className="mb-3">This week at Marino, we are exploring how maths can help us better understand the world around us, with a focus on how we get to campus each day.</p>
        <p className="mb-3">You <i>may</i> be amazed at what maths exploration can be driven by just two questions.</p>
        <p className="mb-3">Curious? Simply share your <b>primary mode of transport</b> and <b>how far you travelled</b> to campus today to find out more!</p>
      </div>
      <TransportationForm onSubmit={handleFormSubmit}/>
    </div>
  );
}

export default HomePage;
