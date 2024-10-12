import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Slider, Typography, Box, Button, SelectChangeEvent } from '@mui/material';

interface TransportationFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  distance: number;
  transport_mode: string;
  captcha: string;
}

const TransportationForm = ({ onSubmit }: TransportationFormProps) => {
  const [transportMode, setTransportMode] = useState('');
  const [distance, setDistance] = useState(0);

  const handleTransportModeChange = (event: SelectChangeEvent) => {
    setTransportMode(event.target.value);
  };

  const handleDistanceChange = (_event: Event, newValue: number | number[]) => {
    setDistance(newValue as number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
        (window as any).grecaptcha.ready(() => {
            (window as any).grecaptcha.execute('6LeCt1sqAAAAAGwlD9Sg-qdYZdEbWP6d63tQ3asy', { action: 'submit' }).then((token: string) => {
                const formData = {
                    distance,
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
    <Box sx={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
      <Typography sx={{ textAlign: 'left'}}>What was your primary mode of transport to school today, and how far did you travel??</Typography>
      <FormControl fullWidth sx={{ marginTop: 6 }}>
        <InputLabel htmlFor="transportation-mode">Transportation Mode</InputLabel>
        <Select
          id="transportation-mode"
          value={transportMode}
          label="Transportation Mode"
          onChange={handleTransportModeChange}
        >
          <MenuItem value="bike">Bike</MenuItem>
          <MenuItem value="car_electric">Car (Electric)</MenuItem>
          <MenuItem value="car_petrol_or_diesel">Car (Petrol or Diesel)</MenuItem>
          <MenuItem value="car_plugin_hybrid">Car (Plugin Hybrid)</MenuItem>
          <MenuItem value="motorbike">Motorbike</MenuItem>
          <MenuItem value="train">Train</MenuItem>
          <MenuItem value="tram_or_bus">Tram or Bus</MenuItem>
          <MenuItem value="walk">None. I Walked!</MenuItem>
        </Select>
      </FormControl>

      <Typography gutterBottom sx={{ marginTop: 6 }}>Distance (km)</Typography>
      <Slider
        value={distance}
        onChange={handleDistanceChange}
        aria-labelledby="distance-slider"
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />


      <Button variant="contained" sx={{ marginTop: 3}} onClick={handleSubmit}>
        Submit
      </Button>

      <Typography variant="body1" sx={{ marginTop: 3 }}>
        Selected Mode: {transportMode ? transportMode : 'None'}
      </Typography>
      <Typography variant="body1">
        Distance: {distance} km
      </Typography>
    </Box>
  );
};

export default TransportationForm;