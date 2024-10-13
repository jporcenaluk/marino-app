import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import StoryLayout from './layouts/StoryLayout';
import HomePage from './pages/HomePage';
import Story01Summary from './pages/story/Story01Summary'
import Story02Next from './pages/story/Story02Next'
import React from 'react';

const AppRoutes = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route element={<StoryLayout />}>
                <Route path="/story/1" element={<Story01Summary />} />
                <Route path="/story/2" element={<Story02Next />} />
            </Route>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default AppRoutes;