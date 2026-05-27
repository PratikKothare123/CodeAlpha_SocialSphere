import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import UserCard from '../components/UserCard';
import { userApi } from '../services/api';

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async (query = '') => {
    setLoading(true);
    const { data } = await userApi.explore(query);
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="space-y-4">
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); load(q); }} className="flex gap-2">
          <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people" />
          <button className="btn-primary">
            <Search size={16} /> Search
          </button>
        </form>
      </div>
      {loading ? <Loader /> : users.length === 0 ? <EmptyState title="No users found" /> : users.map((profile) => (
        <UserCard key={profile._id} profile={profile} onFollow={(updated) => setUsers((items) => items.map((item) => item._id === updated._id ? updated : item))} />
      ))}
    </section>
  );
}

