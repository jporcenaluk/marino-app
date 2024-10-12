import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponent from '../../frontend-2/src/pages/FormPage/FormComponent';
import VisualisationComponent from '../../frontend-2/src/pages/VisualisationPage/VisualisationComponent'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/visualisation" element={<VisualisationComponent />} />
      </Routes>
    </Router>
  );
};
export default App;
