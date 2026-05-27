import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import ProfileHeader from '../components/ProfileHeader';
import { userApi } from '../services/api';

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userApi.profile(username).then(({ data }) => {
      setProfile(data.user);
      setPosts(data.posts);
    }).finally(() => setLoading(false));
  }, [username]);

  if (loading) return <Loader />;
  if (!profile) return <EmptyState title="Profile not found" />;

  return (
    <section className="space-y-5">
      <ProfileHeader profile={profile} setProfile={setProfile} />
      {posts.length === 0 ? <EmptyState title="No posts yet" /> : posts.map((post) => (
        <PostCard key={post._id} post={post} onDeleted={(id) => setPosts((items) => items.filter((post) => post._id !== id))} />
      ))}
    </section>
  );
}

