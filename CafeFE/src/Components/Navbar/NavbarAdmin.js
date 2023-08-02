import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiCollection, BiFoodMenu, BiTable, BiUser, BiLogOut } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";

function NavbarAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Jika pengguna belum login, arahkan ke halaman login
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Hapus data dari localStorage
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    // Navigasi ke halaman login
    navigate("/");
  };

  return (
    <nav className="bg-[#7197d9e4]">
      <div className="md:flex p-2 mx-auto items-center">
        <div className="font-bold container flex items-center text-xl text-[#F2E3DB]">
          Foodie Cafe
          <div className="pl-3 text-3xl">
            <IoFastFoodSharp />
          </div>
        </div>

        <div className="container flex items-center pr-96 text-[#F2E3DB] capitalize">
          <a
            href="DashboardAdmin"
            className="flex items-center justify-center px-7 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749] mr-3"
          >
            <div className="text-xl">
              <BiCollection />
            </div>
            <span className="pl-2">Dashboard</span>
          </a>
          <a
            href="menu"
            className="flex items-center justify-center px-7 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749] mr-3"
          >
            <div className="text-xl">
              <BiFoodMenu />
            </div>
            <span className="pl-2">Menu</span>
          </a>
          <a
            href="Meja"
            className="flex items-center justify-center px-7 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749] mr-3"
          >
            <div className="text-xl">
              <BiTable />
            </div>
            <span className="pl-2">Meja</span>
          </a>
          <a
            href="User"
            className="flex items-center justify-center px-7 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749] mr-3"
          >
            <div className="text-xl">
              <BiUser />
            </div>
            <span className="pl-2">Pengguna</span>
          </a>
        </div>
        <a
          className="flex items-center justify-center h-9 font-bold text-xl w-[120px] rounded ring-2 ring-white bg-[#F2E3DB] px-3 hover:bg-[#E86A33] focus:ring no-underline text-[#41644A] hover:text-[#F2E3DB]"
          onClick={handleLogout}
          href="/"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
