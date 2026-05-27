import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { commentApi } from '../services/api';
import { Avatar } from './PostCard';

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    commentApi.list(postId).then(({ data }) => setComments(data.comments));
  }, [postId]);

  const add = async (event) => {
    event.preventDefault();
    const { data } = await commentApi.create(postId, { text });
    setComments((items) => [...items, data.comment]);
    setText('');
  };

  const remove = async (id) => {
    await commentApi.remove(id);
    setComments((items) => items.filter((item) => item._id !== id));
    toast.success('Comment deleted');
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold">Comments</h2>
      <form onSubmit={add} className="mt-4 flex gap-2">
        <input className="field" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." />
        <button className="btn-primary" disabled={!text.trim()}>Send</button>
      </form>
      <div className="mt-5 space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3">
            <Avatar user={comment.user} />
            <div className="flex-1 rounded-md bg-mist p-3">
              <p className="text-sm font-bold">@{comment.user?.username}</p>
              <p className="mt-1 text-sm text-slate-700">{comment.text}</p>
            </div>
            {comment.user?._id === user?._id && (
              <button className="btn-secondary px-2 text-coral" onClick={() => remove(comment._id)} title="Delete comment">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

