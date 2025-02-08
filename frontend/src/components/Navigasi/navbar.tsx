"use client";

import * as React from 'react';

const Navbar = () => {
    const [user, setUser] = React.useState(null);
    const [cartItemCount, setCartItemCount] = React.useState(0);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        window.location.reload();
    };

    // Fungsi untuk menghitung total item di keranjang
    const calculateCartItems = () => {
        const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(totalItems);
    };

    React.useEffect(() => {
        // Load user data
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Initial cart count
        calculateCartItems();

        // Setup event listener untuk update cart count
        const handleStorageChange = (e) => {
            if (e.key === "cart") {
                calculateCartItems();
            }
        };

        // Listen for changes in sessionStorage
        window.addEventListener('storage', handleStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
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
                        <li><a href='/'>Home</a></li>
                        <li><a href='/pesanan'>Pesanan saya</a></li>
                        <li>
                            <div className="indicator">
                                {cartItemCount > 0 && (
                                    <span className="indicator-item badge badge-secondary">{cartItemCount} Item</span>
                                )}
                                <a href='/keranjang'>Keranjang saya</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <a href='/' className="btn btn-ghost text-xl">Naffie's Restaurant</a>
            </div>
            {/* Mode Website */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/'>Home</a></li>
                    <li><a href='/pesanan'>Pesanan saya</a></li>
                    <li>
                        <div className="indicator">
                            {cartItemCount > 0 && (
                                <span className="indicator-item badge badge-secondary">{cartItemCount} Item</span>
                            )}
                            <a href='/keranjang'>Keranjang saya</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="gap-2 navbar-end hidden lg:flex">
                {user ? (
                    <div className="flex items-center gap-2">
                        <span>{user.data?.user?.name || user.data?.userAdmin?.name}🖐🏼</span>
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