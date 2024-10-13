import React, { useState, ChangeEvent } from 'react';
import "./TransportationForm.css";

interface TransportationFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  distance_km: number;
  transport_mode: string;
  captcha: string;
}

const TransportationForm = ({ onSubmit }: TransportationFormProps) => {
  const [transportMode, setTransportMode] = useState<string>('');
  const [distanceKm, setDistanceKm] = useState<number>(0);

  const handleTransportModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTransportMode(event.target.value);
  };

  const handleDistanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistanceKm(Number(event.target.value));
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
        <div className="mb-4">What was your primary mode of transport to school today, and how far did you travel?</div>

        <div className="mb-4">
          <label htmlFor="transportation-mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transportation Mode</label>
          <select
            id="transportation-mode"
            value={transportMode}
            onChange={handleTransportModeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          <input type="range" min="1" max="100" value={distanceKm} className="range" onChange={handleDistanceChange} />
          <p>{distanceKm}</p>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
    </form>
  );
};

export default TransportationForm;