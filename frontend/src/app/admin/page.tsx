// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [menuCount, setMenuCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi pemanggilan API untuk mendapatkan data dashboard
    const fetchDashboardData = async () => {
      // Simulasi data, ganti dengan fetch/axios ke API Anda jika diperlukan
      const simulatedData = {
        menuCount: 3,
        orderCount: 10,
        monthlyTotal: 10000,
      };

      // Simulasikan delay API
      setTimeout(() => {
        setMenuCount(simulatedData.menuCount);
        setOrderCount(simulatedData.orderCount);
        setMonthlyTotal(simulatedData.monthlyTotal);
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <p className="text-xl font-semibold text-pink-600">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Selamat Datang di Dashboard 🎉
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Jumlah Menu */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-pink-500">
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            Jumlah Menu 😋
          </h2>
          <p className="text-3xl font-semibold text-gray-800">{menuCount}</p>
        </div>

        {/* Card Jumlah Pesanan */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-pink-500">
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            Jumlah Pesanan 🚀
          </h2>
          <p className="text-3xl font-semibold text-gray-800">{orderCount}</p>
        </div>

        {/* Card Total Bulan Ini */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-pink-500">
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            Total Bulan Ini 💰
          </h2>
          <p className="text-3xl font-semibold text-gray-800">
            Rp {monthlyTotal.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}
