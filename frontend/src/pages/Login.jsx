import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const { loading, run } = useAsync();

  const submit = async (event) => {
    event.preventDefault();
    await run(() => login(form), 'Login failed');
    navigate('/');
  };

  return <AuthShell title="Welcome back" subtitle="Log in to your SocialSphere account">
    <form onSubmit={submit} className="space-y-4">
      <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="btn-primary w-full" disabled={loading}>Login</button>
      <p className="text-center text-sm text-slate-500">New here? <Link className="font-semibold text-aqua" to="/signup">Create account</Link></p>
    </form>
  </AuthShell>;
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4">
      <section className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-ink">SocialSphere</h1>
        <h2 className="mt-6 text-xl font-bold">{title}</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500">{subtitle}</p>
        {children}
      </section>
    </main>
  );
}

