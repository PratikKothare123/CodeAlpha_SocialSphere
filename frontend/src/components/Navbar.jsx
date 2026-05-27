import { LogOut, Search, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-aqua text-white">
            <Sparkles size={18} />
          </span>
          SocialSphere
        </Link>
        <button className="btn-secondary hidden sm:inline-flex" onClick={() => navigate('/explore')}>
          <Search size={16} /> Explore
        </button>
        <div className="flex items-center gap-3">
          <Link to={`/profile/${user?.username}`} className="text-sm font-semibold text-ink hover:text-aqua">
            @{user?.username}
          </Link>
          <button className="btn-secondary px-3" onClick={logout} title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

