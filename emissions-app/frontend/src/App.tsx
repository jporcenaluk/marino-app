import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormComponent from './pages/FormPage/FormComponent';
import VisualisationComponent from './pages/VisualisationPage/VisualisationComponent'
import React from 'react';

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/visualisation" element={<VisualisationComponent />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default App;
