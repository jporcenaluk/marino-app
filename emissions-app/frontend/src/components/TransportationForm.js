import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Slider, Typography, Box, Button } from '@mui/material';

const TransportationForm = ({ onSubmit }) => {
  const [transportMode, setTransportMode] = useState('');
  const [distance, setDistance] = useState(0);

  const handleTransportModeChange = (event) => {
    setTransportMode(event.target.value);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handleSubmit = () => {
    const formData = {
        distance,
        transport_mode: transportMode
    };
    onSubmit(formData)
  }

  return (
    <Box sx={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="mode-label">Mode of Transportation</InputLabel>
        <Select
          labelId="mode-label"
          value={transportMode}
          label="Mode of Transportation"
          onChange={handleTransportModeChange}
        >
          <MenuItem value="bike">Bike</MenuItem>
          <MenuItem value="walk">Walk</MenuItem>
        </Select>
      </FormControl>

      <Typography gutterBottom>Distance (km)</Typography>
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