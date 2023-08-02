import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiCollection, BiFoodMenu } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { IoFastFoodSharp } from "react-icons/io5"

function NavbarKasir() {
  const navigate = useNavigate();
  const userRole = "admin,manajer,kasir";

  useEffect(() => {
    //jika pengguna belum login, arahkan ke halaman login
    if (!localStorage.getItem("logged")) {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    //hapus data dari localStorage
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    //navigasi ke halaman login
    navigate("/");
  };

  return (
    <>
      <nav className="bg-[#7396c7] ">
        <div className="md:flex p-2 mx-auto items-center">
          <div className="font-bold container flex items-center text-xl  text-[#F2E3DB]">
            Foodie Cafe
            <div className=" pl-3 text-3xl">
              <IoFastFoodSharp />
            </div>
          </div>
          <div className="container flex items-center  text-[#F2E3DB] capitalize ">
            <a
              href="DashboardKasir"
              className="flex items-center justify-center px-5 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749] mr-3"
            >
              <div className="text-2xl">
                <BiCollection />
              </div>
              <span className="pl-2">Dashboard</span>
            </a>
          </div>

          <div className="container flex items-center  text-[#FFF4E0] capitalize ">
            <a
              href="transaksi"
              className="flex items-center px-5 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749]"
            >
              <div className="text-2xl">
                <TbReportMoney />
              </div>
              <span className="pl-2">Transaksi</span>
            </a>
          </div>
          <div className="container flex items-center  text-[#FFF4E0] capitalize ">
            <a
              href="Tambahtransaksi"
              className="flex items-center px-5 py-2 my-2 font-medium text-base transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0] hover:text-[#251749]"
            >
              <div className="text-2xl">
                <BiFoodMenu />
              </div>
              <span className="pl-2">Menu</span>
            </a>
          </div>
          <a
            className="  flex items-center justify-center h-9  font-bold text-xl w-[120px] rounded ring-2 ring-white  bg-[#F8EAD8] px-5 hover:bg-[#B46060]  focus:ring no-underline text-[#243A73] hover:text-[#FFF4E0]"
            onClick={handleLogout}
            href="/"
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
}
export default NavbarKasir;

{/* <aside className="flex flex-col w-52 h-screen px-4 py-8 overflow-y-auto border-r rounded-lg  rtl:border-l bg-[#263A29] border-[#ffff]">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="DashboardAdmin"
            >
              <div classNameName="text-xl">
                <BiCollection />
              </div>
              <span className="mx-4 font-medium">Dashboard</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="menu"
            >
              <div classNameName="text-xl">
                <BiFoodMenu />
              </div>
              <span className="mx-4 font-medium">Menu</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="meja"
            >
              <div classNameName="text-xl">
                <BiTable />
              </div>
              <span className="mx-4 font-medium">Meja</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749]" href="user">
              <div classNameName="text-xl">
                <BiUser />
              </div>
              <span className="mx-4 font-medium">Pengguna</span>
            </a>

            <hr className="my-6 border-gray-00 " />

            <a
              className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
              href="Login"
              onClick={handleLogout}
            >
              <div classNameName="text-xl">
                <BiLogOut />
              </div>
              <span className="mx-4 font-medium">Logout</span>
            </a>
          </nav>

          <a
            className="flex items-center px-4 py-2 mt-5 text-[#F2E3DB] transition-colors duration-300 transform rounded-md hover:bg-[#FFF4E0]  hover:text-[#251749] "
            href="DashboardAdmin"
            onClick={handleLogout}
          >
            <div classNameName="text-3xl">
              <BiLogOut />
            </div>
            <span className="mx-2 font-medium text-[#F2E3DB ] ">Logout</span>
          </a>
        </div>
      </aside> */}
