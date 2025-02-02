"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navigasi/navbar";
import Footer from "@/components/Footer/footer";
const Pesanan = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.data.userAdmin);
            setToken(parsedUser.data.token);
        }
    }, []);

    useEffect(() => {
        if (!token || !user) return;

        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:3001/admin/order", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (result.status && result.data.orders) {
                    // Filter orders berdasarkan user ID
                    const userOrders = result.data.orders;
                    setOrders(userOrders);

                    // Fetch product details for each order
                    await fetchProductDetails(userOrders);
                }
            } catch (error) {
                console.error("Gagal mengambil data pesanan:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token, user]);

    const fetchProductDetails = async (orders) => {
        const productDetails = {};

        for (const order of orders) {
            for (const detail of order.OrderDetails) {
                if (!productDetails[detail.product_id]) {
                    try {
                        const response = await fetch(
                            `http://localhost:3001/admin/products/${detail.product_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        const result = await response.json();
                        if (result.status && result.data.product) {
                            productDetails[detail.product_id] = result.data.product;
                        }
                    } catch (error) {
                        console.error(`Gagal mengambil detail produk ${detail.product_id}:`, error);
                    }
                }
            }
        }

        setProducts(productDetails);
    };

    const handleDownloadReceipt = async (orderId) => {
        try {
            // Get receipt URL
            const response = await fetch(
                `http://localhost:3001/admin/order/print/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();

            if (result.status && result.data.receipt_url) {
                // Download file
                const link = document.createElement('a');
                link.href = result.data.receipt_url;
                link.download = `receipt_${orderId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("Gagal mengunduh receipt");
            }
        } catch (error) {
            console.error("Error saat mengunduh receipt:", error);
            alert("Terjadi kesalahan saat mengunduh receipt");
        }
    };

    return (
        <main>
           
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Halaman Pesanan</h1>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 border-b text-left">Order ID</th>
                                    <th className="px-6 py-3 border-b text-left">Customer Name</th>
                                    <th className="px-6 py-3 border-b text-left">Product</th>
                                    <th className="px-6 py-3 border-b text-left">Quantity</th>
                                    <th className="px-6 py-3 border-b text-left">Total Price</th>
                                    <th className="px-6 py-3 border-b text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    order.OrderDetails.map((detail, index) => (
                                        <tr key={`${order.id}-${index}`} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 border-b">{order.id}</td>
                                            <td className="px-6 py-4 border-b">{order.customer_name}</td>
                                            <td className="px-6 py-4 border-b">
                                                {products[detail.product_id]?.name || 'Loading...'}
                                            </td>
                                            <td className="px-6 py-4 border-b">{detail.quantity}</td>
                                            <td className="px-6 py-4 border-b">
                                                Rp {detail.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 border-b">
                                                <button
                                                    onClick={() => handleDownloadReceipt(order.id)}
                                                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                                                >
                                                    Download Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
        </main>
    );
};

export default Pesanan;