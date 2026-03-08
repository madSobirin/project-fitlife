"use client";

import { Search, Bell } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Cari data pasien, menu, atau artikel..."
          className="w-full bg-slate-50/80 border border-slate-100 py-2.5 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Divider Vertical */}
        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800 leading-tight">
              Dr. Andi Wijaya
            </p>
            <p className="text-[11px] font-semibold text-slate-400 tracking-wider">
              ADMINISTRATOR
            </p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-200 overflow-hidden">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi"
                alt="Avatar"
                className="w-full h-full object-cover"
                height={40}
                width={40}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
