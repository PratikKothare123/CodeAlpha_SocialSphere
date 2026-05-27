import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../services/api';
import { Avatar } from './PostCard';

export default function UserCard({ profile, onFollow }) {
  const { user, setUser } = useAuth();
  const following = user?.following?.includes(profile._id);

  const toggle = async () => {
    const { data } = await userApi.toggleFollow(profile._id);
    setUser(data.user);
    onFollow?.(data.target);
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <Link to={`/profile/${profile.username}`} className="flex items-center gap-3">
        <Avatar user={profile} />
        <div>
          <p className="text-sm font-bold">{profile.name || profile.username}</p>
          <p className="text-xs text-slate-500">@{profile.username}</p>
        </div>
      </Link>
      <button className={following ? 'btn-secondary' : 'btn-primary'} onClick={toggle}>
        <UserPlus size={16} /> {following ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

