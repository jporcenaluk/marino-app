import React, { useState } from 'react';
import { Slider } from '@mui/base/Slider';

interface TransportationFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  distance_km: number;
  transport_mode: string;
  captcha: string;
}

const TransportationForm = ({ onSubmit }: TransportationFormProps) => {
  const [transportMode, setTransportMode] = useState('');
  const [distanceKm, setDistanceKm] = useState(0);

  const handleTransportModeChange = (event: any) => {
    setTransportMode(event.target.value);
  };

  const handleDistanceChange = (_event: Event, newValue: number | number[]) => {
    setDistanceKm(newValue as number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
        (window as any).grecaptcha.ready(() => {
            (window as any).grecaptcha.execute('6LeCt1sqAAAAAGwlD9Sg-qdYZdEbWP6d63tQ3asy', { action: 'submit' }).then((token: string) => {
                const formData = {
                    distance_km: distanceKm,
                    transport_mode: transportMode,
                    captcha: token,
                };
                onSubmit(formData);
            });
        });
    } catch(error) {
        console.error('Error submitting the form:', error)
    }
  }

  return (
    <form className="p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <div>What was your primary mode of transport to school today, and how far did you travel??</div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Transportation Mode</label>
          <select
            id="transportation-mode"
            value={transportMode}
            onChange={handleTransportModeChange}
            className="form-select mt-1 block w-full">
              <option value="bike">Bike</option>
              <option value="car_electric">Car (Electric)</option>
              <option value="car_petrol_or_diesel">Car (Petrol or Diesel)</option>
              <option value="car_plugin_hybrid">Car (Plugin Hybrid)</option>
              <option value="motorbike">Motorbike</option>
              <option value="train">Train</option>
              <option value="tram_or_bus">Tram or Bus</option>
              <option value="walk">None. I Walked!</option>
            </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Distance (km)</label>
          <Slider 
            value={distanceKm}
            onChange={handleDistanceChange}
            min={0}
            max={50}
          />
          <p>{distanceKm}</p>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default TransportationForm;