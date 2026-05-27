import { Compass, Home, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-white text-aqua shadow-sm' : 'text-slate-600 hover:bg-white hover:text-ink'}`;

  return (
    <aside className="hidden md:block">
      <nav className="sticky top-20 space-y-2">
        <NavLink to="/" className={linkClass}>
          <Home size={18} /> Feed
        </NavLink>
        <NavLink to="/explore" className={linkClass}>
          <Compass size={18} /> Explore
        </NavLink>
        <NavLink to={`/profile/${user?.username}`} className={linkClass}>
          <UserRound size={18} /> Profile
        </NavLink>
      </nav>
    </aside>
  );
}

