import { Plus, Search, Filter, Pencil, Trash2 } from "lucide-react";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import Image from "next/image";

// Interface untuk tipe data menu
interface MenuSehat {
  id: string;
  nomor: string;
  foto: string;
  nama: string;
  targetStatus: "Normal" | "Stabil";
  nutrisi: string;
  durasi: string;
  deskripsi: string;
}

const MENU_DATA: MenuSehat[] = [
  {
    id: "1",
    nomor: "01",
    foto: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
    nama: "Salad Brokoli Segar",
    targetStatus: "Normal",
    nutrisi: "230 kkal",
    durasi: "20 menit",
    deskripsi: "Salad sehat dengan saus sasa rendah lemak...",
  },
  {
    id: "2",
    nomor: "02",
    foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
    nama: "Buddha Bowl Kacang",
    targetStatus: "Stabil",
    nutrisi: "222 kkal",
    durasi: "222 menit",
    deskripsi: "Perpaduan sayur dan saus kacang sasa...",
  },
  {
    id: "3",
    nomor: "03",
    foto: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
    nama: "Tumis Sawi Bawang",
    targetStatus: "Stabil",
    nutrisi: "250 kkal",
    durasi: "200 menit",
    deskripsi: "Sawi segar ditumis bumbu sasa alami...",
  },
];

export default function MenuPage() {
  return (
    <LayoutAdmin>
      <div className="p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Daftar Menu Sehat
          </h1>
          <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg shadow-green-500/20">
            <Plus className="w-5 h-5" />
            Tambah Menu
          </button>
        </div>

        {/* Search & Filters Container */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#22c55e] focus:border-transparent text-sm transition-all outline-none"
              placeholder="Cari menu favorit..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-[#22c55e] transition-colors">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Foto
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Menu
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Target Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Nutrisi
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Durasi
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MENU_DATA.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-6 text-sm text-gray-400">
                      {item.nomor}
                    </td>
                    <td className="px-6 py-6">
                      <Image
                        alt={item.nama}
                        className="w-16 h-12 object-cover rounded-lg shadow-sm"
                        src={item.foto}
                        width={100}
                        height={100}
                        unoptimized
                      />
                    </td>
                    <td className="px-6 py-6 font-semibold text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          item.targetStatus === "Normal"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {item.targetStatus}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-600">
                      {item.nutrisi}
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-600">
                      {item.durasi}
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-500 max-w-xs truncate">
                      {item.deskripsi}
                    </td>
                    <td className="px-6 py-6 text-right space-x-2">
                      <button className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors">
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Menampilkan {MENU_DATA.length} dari 12 menu
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 transition-all">
                Sebelumnya
              </button>
              <button className="px-4 py-2 text-sm bg-[#22c55e] text-white rounded-xl font-medium shadow-sm">
                1
              </button>
              <button className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all">
                2
              </button>
              <button className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
