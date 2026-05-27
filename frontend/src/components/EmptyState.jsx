export default function EmptyState({ title, text }) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {text && <p className="mt-2 text-sm text-slate-500">{text}</p>}
    </div>
  );
}

