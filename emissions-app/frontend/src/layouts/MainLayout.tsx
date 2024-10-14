import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4">
            <Outlet />
        </main>
        <Footer />
    </div>
)

export default MainLayout;