import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen font-outfit flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
