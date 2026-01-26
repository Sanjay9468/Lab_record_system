export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}