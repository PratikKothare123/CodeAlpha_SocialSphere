import { ImagePlus, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { postApi } from '../services/api';
import { useAsync } from '../hooks/useAsync';

export default function CreatePostForm({ onCreated }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const { loading, run } = useAsync();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    if (image) formData.append('image', image);

    const { data } = await run(() => postApi.create(formData), 'Could not create post');
    setCaption('');
    setImage(null);
    toast.success('Post published');
    onCreated?.(data.post);
  };

  return (
    <form onSubmit={submit} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <textarea className="field min-h-24 resize-none" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Share something with your sphere..." />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <label className="btn-secondary cursor-pointer">
          <ImagePlus size={16} /> Image
          <input className="hidden" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </label>
        {image && <span className="text-sm text-slate-500">{image.name}</span>}
        <button className="btn-primary" disabled={loading || !caption.trim()}>
          <Send size={16} /> Post
        </button>
      </div>
    </form>
  );
}

