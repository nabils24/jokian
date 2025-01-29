"use client";

import * as React from 'react';

const Navbar = () => {
    const [user, setUser] = React.useState(null);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        window.location.reload();
    };

    React.useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="navbar bg-pink-500 text-white lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50">
            {/* mode mobile */}
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                        <li><a>Home</a></li>
                        <li><a>Menu</a></li>
                        <li><a>Kontak Kami</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Naffie's Restaurant</a>
            </div>
            {/* Mode Website */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li><a>Kontak Kami</a></li>
                </ul>
            </div>
            <div className="gap-2 navbar-end hidden lg:flex">
                {user ? (
                    <div className="flex items-center gap-2">
                        <span> {user.data?.user?.name || user.data?.userAdmin?.name}🖐🏼</span>
                        <button onClick={handleLogout} className="btn bg-pink-300 hover:bg-pink-600">
                            Keluar
                        </button>
                    </div>

                ) : (
                    <>
                        <a href="/auth/masuk" className="btn bg-pink-300 hover:bg-pink-600">Masuk</a>
                        <a href="/auth/daftar" className="btn bg-pink-300 hover:bg-pink-600">Daftar</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;