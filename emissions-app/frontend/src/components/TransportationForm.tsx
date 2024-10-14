import React, { useState, ChangeEvent, useEffect } from 'react';
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
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleTransportModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTransportMode(event.target.value);
  };

  const handleDistanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDistanceKm(Number(event.target.value));
  };

  useEffect(() => {
    const isValid = transportMode !== '' && distanceKm > 0;
    setIsFormValid(isValid);
  }, [transportMode, distanceKm]);

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

    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <label htmlFor="transportation-mode" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Transportation Mode</label>
        <select
          id="transportation-mode"
          value={transportMode}
          required
          onChange={handleTransportModeChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" disabled>Choose...</option>
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
        <div className="flex justify-between">
          <label htmlFor="distance" className="block text-md text-white mb-2">Distance (km)</label>
          <p className="text-md text-white">{distanceKm} km</p>
        </div>
        <input id="distance" required type="range" min="1" max="100" value={distanceKm} className="range range-lg" onChange={handleDistanceChange} />

      </div>
      <div className="mb-8 text-xs text-gray-500">
        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>
      <div className="flex justify-end">
        <button 
          type="submit" 
          className={
            `${
              isFormValid ? 'btn btn-primary' : 'btn btn-primary bg-gray-300 text-gray-500'
            }`
          }
          disabled={!isFormValid}
          >
            Maths It Up!
          </button>
      </div>
    </form>

  );
};

export default TransportationForm;