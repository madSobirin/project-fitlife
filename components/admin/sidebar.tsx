import React from "react";
import { Zap, Home, Utensils, NotebookText, Users, LogOut } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

interface SidebarItem {
  name: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { name: "Beranda", label: "Beranda", icon: Home, href: "/beranda" },
  {
    name: "Menu Sehat",
    label: "Menu Sehat",
    icon: Utensils,
    href: "/menu-sehat",
  },
  { name: "Artikel", label: "Artikel", icon: NotebookText, href: "/artikel" },
  { name: "Pengguna", label: "Pengguna", icon: Users, href: "/pengguna" },
];

const Sidebar: React.FC = () => {
  const currentPath = "/beranda";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-100 flex flex-col p-6 font-sans">
      <div className="flex items-center gap-3 mb-10">
        <Zap className="w-10 h-10 text-emerald-500 bg-emerald-100 p-2 rounded-xl" />
        <span className="text-2xl font-semibold text-emerald-500 tracking-tight">
          FitLife.id
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = currentPath === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 w-full",
                {
                  "bg-emerald-500 text-white shadow-inner": isActive,
                  "text-slate-600 hover:text-emerald-500": !isActive,
                },
              )}
            >
              <item.icon
                className={clsx("w-6 h-6", {
                  "text-white": isActive,
                  "text-slate-400": !isActive,
                })}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bagian Log Out (Tombol terpisah dengan warna merah) */}
      <button className="flex items-center gap-4 px-4 py-3 mt-auto rounded-lg text-lg font-medium text-red-500 hover:bg-red-50 transition-colors duration-200 w-full">
        <LogOut className="w-6 h-6 text-red-400" />
        <span>Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
