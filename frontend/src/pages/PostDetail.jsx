import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import { postApi } from '../services/api';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postApi.get(id).then(({ data }) => setPost(data.post)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!post) return null;

  return (
    <section className="space-y-5">
      <PostCard post={post} onUpdated={setPost} />
      <CommentSection postId={post._id} />
    </section>
  );
}

