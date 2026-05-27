import { useEffect, useState } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import { postApi } from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async (nextPage = 1) => {
    const { data } = await postApi.feed(nextPage);
    setPosts((items) => (nextPage === 1 ? data.posts : [...items, ...data.posts]));
    setHasMore(data.hasMore);
    setPage(nextPage);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="space-y-5">
      <CreatePostForm onCreated={(post) => setPosts((items) => [post, ...items])} />
      {loading ? <Loader /> : posts.length === 0 ? (
        <EmptyState title="Your feed is quiet" text="Follow people from Explore or publish your first post." />
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} onDeleted={(id) => setPosts((items) => items.filter((post) => post._id !== id))} />)
      )}
      {hasMore && <button className="btn-secondary w-full" onClick={() => load(page + 1)}>Load more</button>}
    </section>
  );
}

