import { ImagePlus, Save } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { userApi } from '../services/api';

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { loading, run } = useAsync();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('bio', form.bio);
    if (image) formData.append('profilePicture', image);
    const { data } = await run(() => userApi.updateProfile(formData), 'Could not update profile');
    setUser(data.user);
    toast.success('Profile updated');
    navigate(`/profile/${data.user.username}`);
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-xl font-bold">Edit profile</h1>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <textarea className="field min-h-28" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" />
        <label className="btn-secondary cursor-pointer">
          <ImagePlus size={16} /> Profile image
          <input className="hidden" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </label>
        {image && <p className="text-sm text-slate-500">{image.name}</p>}
        <button className="btn-primary" disabled={loading}>
          <Save size={16} /> Save changes
        </button>
      </form>
    </section>
  );
}

