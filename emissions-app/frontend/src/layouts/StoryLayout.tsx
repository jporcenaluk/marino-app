import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import Footer from '../components/Footer';
import { StoryProgressProvider } from '../contexts/StoryProgressContext';

const StoryLayout = () => (
  <StoryProgressProvider currentStep={1} totalSteps={2} setCurrentStep={() => {}}>
    <div className="min-h-screen flex flex-col bg-customBlue text-customWhite">
        <Header />
        <main className="flex-grow p-4 max-w-3xl mx-auto">
          <Outlet />
        </main>
        <ProgressBar />
        <Footer />
    </div>
  </StoryProgressProvider>
);

export default StoryLayout;
