export default function Loader({ fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-8'}`}>
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-aqua" />
    </div>
  );
}

