import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Settings,
  Users,
} from "lucide-react";

export const sidebarConfig = {
  faculty: [
    { label: "Dashboard", to: "/faculty", icon: LayoutDashboard },
    { label: "Experiments", to: "/faculty", icon: BookOpen },
    { label: "Submissions", to: "/faculty", icon: ClipboardCheck },
    { label: "Settings", to: "/faculty/settings", icon: Settings },
  ],

  student: [
    { label: "Dashboard", to: "/student", icon: LayoutDashboard },
    { label: "Experiments", to: "/student", icon: BookOpen },
    { label: "Settings", to: "/student/settings", icon: Settings },
  ],

  admin: [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    { label: "Users", to: "/admin/users", icon: Users },
    { label: "Settings", to: "/admin/settings", icon: Settings },
  ],
};