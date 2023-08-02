import { Routes, Route, useLocation } from "react-router-dom";
// import SidebarAdmin from "./Components/SidebarAdmin"
import Login from "./pages/Login"
import DashboardAdmin from "./pages/admin/DashboardAdmin"
import Menu from "./pages/admin/Menu"
import User from "./pages/admin/User"
import Meja from "./pages/admin/Meja"
import DashboardKasir from "./pages/kasir/DashboardKasir";
import Transaksi from "./pages/kasir/Transaksi";
import TambahTransaksi from "./pages/kasir/TambahTransaksi";

import DashboardManajer from "./pages/manajer/DashboardManajer"
import TransaksiManajer from "./pages/manajer/Transaksi";
import Laporan from "./pages/manajer/Laporan";

import './App.css';
import Layout from "./Components/layout";

function App(){
  const location = useLocation();
  console.log(location.pathname)

  return(
    <>
    <div className="App bg-[#F2E3DB] h-full min-h-screen text-[Poppins]">
      
      {/* agar login tidak menampilkan sidebar */}
      {/* {location.pathname !== '/Login' && location.pathname !== '*' && <SidebarAdmin />} */}
      {location.pathname !== '/' && location.pathname !== '*' && <Layout />}


      {/* route utama */}
      <Routes>
        <Route path="/" element={ <Login/>} />
      </Routes> 
      {/* route admin */} 
      <Routes path="/admin" element={<DashboardAdmin/>}>
        <Route path="DashboardAdmin" element={<DashboardAdmin/>}/>
        <Route path="menu" element={<Menu/>}/>
        <Route path="user" element={<User/>}/>
        <Route path="meja" element={<Meja/>}/>
      </Routes>
      {/* route kasir */}
      <Routes path="  /kasir" element={<DashboardKasir/>}>
      <Route path="DashboardKasir" element={<DashboardKasir/>}/>
        <Route path="transaksi" element={<Transaksi/>}/>
        <Route path="Tambahtransaksi" element={<TambahTransaksi/>}/>
      </Routes>
      {/* route manajer */}
      <Routes path="  /manajer" element={<DashboardManajer/>}>
      <Route path="DashboardManajer" element={<DashboardManajer/>}/>
      <Route path="TransaksiManajer" element={<TransaksiManajer/>}/>
      <Route path="Laporan" element={<Laporan/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App