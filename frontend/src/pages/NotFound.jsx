import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-4">
      <section className="text-center">
        <h1 className="text-5xl font-bold text-ink">404</h1>
        <p className="mt-3 text-slate-500">That page does not exist.</p>
        <Link className="btn-primary mt-5" to="/">Go home</Link>
      </section>
    </main>
  );
}

