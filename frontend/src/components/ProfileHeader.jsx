import { Edit3, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../services/api';
import { Avatar } from './PostCard';

export default function ProfileHeader({ profile, setProfile }) {
  const { user, setUser } = useAuth();
  const mine = user?._id === profile?._id;
  const following = user?.following?.includes(profile?._id);

  const toggleFollow = async () => {
    const { data } = await userApi.toggleFollow(profile._id);
    setUser(data.user);
    setProfile(data.target);
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar user={profile} size="h-20 w-20" />
          <div>
            <h1 className="text-2xl font-bold">{profile.name || profile.username}</h1>
            <p className="text-sm text-slate-500">@{profile.username}</p>
            <p className="mt-2 max-w-xl text-sm text-slate-700">{profile.bio || 'No bio yet.'}</p>
          </div>
        </div>
        {mine ? (
          <Link to="/profile/edit" className="btn-secondary">
            <Edit3 size={16} /> Edit
          </Link>
        ) : (
          <button className={following ? 'btn-secondary' : 'btn-primary'} onClick={toggleFollow}>
            <UserPlus size={16} /> {following ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
      <div className="mt-5 flex gap-6 border-t border-slate-100 pt-4 text-sm">
        <span><strong>{profile.followers?.length || 0}</strong> followers</span>
        <span><strong>{profile.following?.length || 0}</strong> following</span>
      </div>
    </section>
  );
}

