"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, User, ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type UserData = {
  id: number;
  name: string;
  email: string;
  role: string;
  google_avatar?: string | null;
};

export default function NavProfile() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        setOpen(false);
        router.push("/");
        router.refresh(); // Penting: refresh server components
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  // Loading state — hindari layout shift
  if (loading) {
    return <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />;
  }

  // Belum login — tampilkan tombol Login
  if (!user) {
    return (
      <Link
        href="/login"
        className="bg-primary hover:bg-primary-hover text-background-dark px-6 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(0,255,127,0.3)] transition transform hover:-translate-y-0.5 flex items-center gap-2"
      >
        <LogIn size={18} />
        <span>Login</span>
      </Link>
    );
  }

  // Sudah login — tampilkan avatar + dropdown
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 group"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors flex items-center justify-center bg-primary/20 text-primary font-bold text-sm select-none">
          {user.google_avatar ? (
            <Image
              src={user.google_avatar}
              alt={user.name}
              width={36}
              height={36}
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Nama singkat + chevron */}
        <span className="hidden sm:block text-sm font-semibold text-white max-w-[100px] truncate">
          {user.name?.split(" ")[0]}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/60 transition-transform duration-200 cursor-pointer ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0f1117]/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header profile */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-semibold text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-white/50 truncate">{user.email}</p>
            {user.role === "admin" && (
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-primary font-medium">
                <ShieldCheck size={12} />
                Admin
              </span>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              <User size={15} />
              <span>Profil Saya</span>
            </Link>

            {user.role === "admin" && (
              <Link
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ShieldCheck size={15} />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-white/10 py-1">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
            >
              <LogOut size={15} />
              <span>{loggingOut ? "Keluar..." : "Keluar"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
