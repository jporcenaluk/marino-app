import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import StoryLayout from './layouts/StoryLayout';
import StatsSummary from './pages/StatsSummary';
import HomePage from './pages/HomePage';
import Story01Summary from './pages/story/Story01Summary'
import Story02Questions from './pages/story/Story02Questions'
import Story03Conclusion from './pages/story/Story03Conclusion'
import React from 'react';

const AppRoutes = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route element={<StoryLayout />}>
                <Route path="/story/1" element={<Story01Summary />} />
                <Route path="/story/2" element={<Story02Questions />} />
                <Route path="/story/3" element={<Story03Conclusion />} />
            </Route>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/stats" element={<StatsSummary />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default AppRoutes;