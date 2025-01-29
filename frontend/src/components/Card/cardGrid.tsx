"use client";

import { useEffect, useState } from "react";

const CardGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    // Ambil data user dari sessionStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.data.userAdmin);
            setToken(parsedUser.data.token);
        }
    }, []);

    // Ambil produk dari API jika token sudah tersedia
    useEffect(() => {
        if (!token) return; // Jangan fetch sebelum token ada

        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3001/admin/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (result.status && result.data.product) {
                    setProducts(result.data.product);
                }
            } catch (error) {
                console.error("Gagal mengambil data produk:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]); // Hanya jalankan fetch jika token sudah ada

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="container mx-auto py-10">
                <h2 className="text-3xl font-bold text-center mb-6">🍧Ice Cream Kami🍧</h2>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
                        {products.map((product) => (
                            <div key={product.id} className="card card-compact bg-base-100 shadow-xl">
                                <figure>
                                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body bg-pink-100">
                                    <h2 className="card-title">{product.name}</h2>
                                    <p className="text-gray-600">Size: {product.size}</p>
                                    <p className="font-semibold text-lg">Rp {product.price.toLocaleString()}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn bg-pink-300">Beli Sekarang</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardGrid;
