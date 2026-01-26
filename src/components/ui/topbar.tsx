export default function Topbar({ title }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
      <h1 className="font-semibold text-lg">{title}</h1>
    </header>
  );
}