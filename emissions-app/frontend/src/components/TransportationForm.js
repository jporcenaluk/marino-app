import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Slider, Typography, Box } from '@mui/material';

const TransportationForm = () => {
  const [mode, setMode] = useState('');
  const [distance, setDistance] = useState(0);

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  return (
    <Box sx={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="mode-label">Mode of Transportation</InputLabel>
        <Select
          labelId="mode-label"
          value={mode}
          label="Mode of Transportation"
          onChange={handleModeChange}
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

      <Typography variant="body1" sx={{ marginTop: 3 }}>
        Selected Mode: {mode ? mode : 'None'}
      </Typography>
      <Typography variant="body1">
        Distance: {distance} km
      </Typography>
    </Box>
  );
};

export default TransportationForm;