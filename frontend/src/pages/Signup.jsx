import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { AuthShell } from './Login';

export default function Signup() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { loading, run } = useAsync();

  const submit = async (event) => {
    event.preventDefault();
    await run(() => signup(form), 'Signup failed');
    navigate('/');
  };

  return <AuthShell title="Create account" subtitle="Start sharing with your circle">
    <form onSubmit={submit} className="space-y-4">
      <input className="field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="field" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="btn-primary w-full" disabled={loading}>Sign up</button>
      <p className="text-center text-sm text-slate-500">Already joined? <Link className="font-semibold text-aqua" to="/login">Login</Link></p>
    </form>
  </AuthShell>;
}

