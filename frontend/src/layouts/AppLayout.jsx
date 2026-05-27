import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-mist">
      <Navbar />
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-5 md:grid-cols-[220px_1fr]">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}

