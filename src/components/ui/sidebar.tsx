import { Home, Layers, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white dark:bg-slate-900 p-4 space-y-2">
      <h2 className="font-bold text-lg mb-6">Dashboard</h2>

      {[
        { icon: Home, label: "Dashboard" },
        { icon: Layers, label: "Manage" },
        { icon: User, label: "Profile" },
      ].map((item, i) => (
        <button
          key={i}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-xl
                     hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <item.icon className="w-4 h-4 text-slate-500" />
          <span>{item.label}</span>
        </button>
      ))}
    </aside>
  );
}