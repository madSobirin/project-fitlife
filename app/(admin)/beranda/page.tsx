"use client";

import LayoutAdmin from "@/components/admin/LayoutAdmin";
import { motion } from "framer-motion";
import { Users, Utensils, Newspaper, UserCheck } from "lucide-react";

// Data Dummy sesuai gambar
const stats = [
  { label: "Total Pengguna", value: "4", icon: Users },
  { label: "Pengguna Aktif", value: "3", icon: UserCheck },
  { label: "Total Menu", value: "3", icon: Utensils },
  { label: "Total Artikel", value: "1", icon: Newspaper },
];

const menuTerbaru = [
  { no: 1, nama: "brokoli", dilihat: "4x" },
  { no: 2, nama: "kocak", dilihat: "5x" },
  { no: 3, nama: "Sawi", dilihat: "7x" },
];

const penggunaTerbaru = [
  {
    no: 1,
    nama: "Putri Maharani",
    email: "zvory3168@gmail.com",
    status: "Aktif",
    tgl: "08 Maret 2026 15:00",
  },
  {
    no: 2,
    nama: "Ahmad Sobirin",
    email: "ahmadsobirin67834@gmail.com",
    status: "Aktif",
    tgl: "05 Maret 2026 14:26",
  },
  {
    no: 3,
    nama: "bansn",
    email: "gamingbrn2202@gmail.com",
    status: "Belum Login",
    tgl: "",
  },
  {
    no: 4,
    nama: "Ahmad Sobirin",
    email: "gamingbrn202@gmail.com",
    status: "Aktif",
    tgl: "04 Maret 2026 21:32",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function BerandaPage() {
  return (
    <LayoutAdmin>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-text-light tracking-tight">
            Dashboard Admin
          </h1>
          <p className="text-sm text-slate-500 dark:text-text-muted">
            Update terakhir:{" "}
            {new Date().toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* STATS CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-card-dark p-5 md:p-6 rounded-xl border border-slate-100 dark:border-card-border shadow-sm flex flex-col gap-1 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-text-muted">
                  {stat.label}
                </p>
                <stat.icon className="h-4 w-4 text-emerald-500/70" />
              </div>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
          {/* MENU TERBARU TABLE */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-5 bg-white dark:bg-card-dark rounded-xl border border-slate-100 dark:border-card-border shadow-sm overflow-hidden transition-colors duration-300"
          >
            <div className="p-4 md:p-5 border-b border-slate-50 dark:border-card-border">
              <h2 className="font-bold text-slate-800 dark:text-text-light">
                Menu Terbaru
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-background-dark text-slate-600 dark:text-text-muted font-semibold transition-colors">
                  <tr>
                    <th className="px-5 py-3 border-b dark:border-card-border">
                      No
                    </th>
                    <th className="px-5 py-3 border-b dark:border-card-border">
                      Nama Menu
                    </th>
                    <th className="px-5 py-3 border-b dark:border-card-border">
                      Dilihat
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-card-border">
                  {menuTerbaru.map((item) => (
                    <tr
                      key={item.no}
                      className="hover:bg-slate-50/50 dark:hover:bg-background-base/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-400">
                        {item.no}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700 dark:text-text-light">
                        {item.nama}
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-text-muted">
                        {item.dilihat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* PENGGUNA TERBARU TABLE */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-7 bg-white dark:bg-card-dark rounded-xl border border-slate-100 dark:border-card-border shadow-sm overflow-hidden transition-colors duration-300"
          >
            <div className="p-4 md:p-5 border-b border-slate-50 dark:border-card-border flex justify-between items-center">
              <h2 className="font-bold text-slate-800 dark:text-text-light">
                Pengguna Terbaru
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-background-dark text-slate-600 dark:text-text-muted font-semibold transition-colors">
                  <tr>
                    <th className="px-5 py-3 border-b dark:border-card-border">
                      No
                    </th>
                    <th className="px-5 py-3 border-b dark:border-card-border">
                      Nama
                    </th>
                    <th className="px-5 py-3 border-b dark:border-card-border">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b dark:border-card-border text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-card-border">
                  {penggunaTerbaru.map((user) => (
                    <tr
                      key={user.no}
                      className="hover:bg-slate-50/50 dark:hover:bg-background-base/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-400">
                        {user.no}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700 dark:text-text-light">
                        {user.nama}
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-text-muted">
                        {user.email}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm transition-colors ${
                              user.status === "Aktif"
                                ? "bg-emerald-500 dark:bg-emerald-600"
                                : "bg-slate-500 dark:bg-slate-600"
                            }`}
                          >
                            {user.status}
                          </span>
                          {user.tgl && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {user.tgl}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-50 dark:border-card-border flex justify-center sm:justify-end">
              <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors px-4 py-2 border border-emerald-100 dark:border-emerald-900/50 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 w-full sm:w-auto">
                Lihat semua pengguna
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
