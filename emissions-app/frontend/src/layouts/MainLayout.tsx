import Header from '../components/Header';
import Footer from '../components/Footer';
import ProgressBar from '../contexts/StoryProgressContext';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="font-sans bg-gray-100 p-6">
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <Header />
      {children}
      <Footer />
      <ProgressBar />
    </div>
  </div>
);

export default MainLayout;