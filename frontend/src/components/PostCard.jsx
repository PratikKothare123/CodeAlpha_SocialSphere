import { Heart, MessageCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postApi } from '../services/api';

export default function PostCard({ post, onDeleted, onUpdated }) {
  const { user } = useAuth();
  const [current, setCurrent] = useState(post);
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const liked = current.likes?.some((id) => id === user?._id);
  const mine = current.author?._id === user?._id;

  const toggleLike = async () => {
    const { data } = await postApi.like(current._id);
    setCurrent((prev) => ({ ...prev, likes: data.likes }));
  };

  const save = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    const { data } = await postApi.update(current._id, formData);
    setCurrent(data.post);
    onUpdated?.(data.post);
    setEditing(false);
    toast.success('Post updated');
  };

  const remove = async () => {
    if (!confirm('Delete this post?')) return;
    await postApi.remove(current._id);
    onDeleted?.(current._id);
    toast.success('Post deleted');
  };

  return (
    <article className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${current.author?.username}`} className="flex items-center gap-3">
          <Avatar user={current.author} />
          <div>
            <p className="text-sm font-bold">{current.author?.name || current.author?.username}</p>
            <p className="text-xs text-slate-500">@{current.author?.username}</p>
          </div>
        </Link>
        {mine && (
          <div className="flex gap-2">
            <button className="btn-secondary px-2" onClick={() => setEditing((value) => !value)} title="Edit post">
              {editing ? <MoreHorizontal size={16} /> : <Pencil size={16} />}
            </button>
            <button className="btn-secondary px-2 text-coral" onClick={remove} title="Delete post">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="px-4 pb-4">
        {editing ? (
          <div className="space-y-3">
            <textarea className="field min-h-24" value={caption} onChange={(e) => setCaption(e.target.value)} />
            <button className="btn-primary" onClick={save}>Save</button>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{current.caption}</p>
        )}
      </div>
      {current.image && <img src={current.image} alt="" className="max-h-[520px] w-full object-cover" />}
      <div className="flex items-center gap-4 border-t border-slate-100 p-4">
        <button className={`flex items-center gap-2 text-sm font-semibold ${liked ? 'text-coral' : 'text-slate-600'}`} onClick={toggleLike}>
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} /> {current.likes?.length || 0}
        </button>
        <Link to={`/posts/${current._id}`} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-aqua">
          <MessageCircle size={18} /> {current.commentsCount || 0}
        </Link>
      </div>
    </article>
  );
}

export function Avatar({ user, size = 'h-10 w-10' }) {
  return user?.profilePicture ? (
    <img src={user.profilePicture} alt="" className={`${size} rounded-full object-cover`} />
  ) : (
    <div className={`${size} grid place-items-center rounded-full bg-aqua/15 font-bold text-aqua`}>
      {(user?.name || user?.username || '?').slice(0, 1).toUpperCase()}
    </div>
  );
}

