import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
    <div className="font-sans bg-gray-100 p-6">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <Header />
        <div>Hi i'm the main layout</div>
        <Outlet />
        <Footer />
        </div>
    </div>
)

export default MainLayout;