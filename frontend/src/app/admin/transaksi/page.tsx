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
                    setOrders(result.data.orders);
                    await fetchProductDetails(result.data.orders);
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
                        console.error(
                            `Gagal mengambil detail produk ${detail.product_id}:`,
                            error
                        );
                    }
                }
            }
        }

        setProducts(productDetails);
    };

    const handleDownloadReceipt = async (orderId) => {
        try {
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
                const link = document.createElement("a");
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


        <div className="container bg-pink-50 mx-auto px-6">
            <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
                Halaman Pesanan Admin 🌸
            </h1>
            {loading ? (
                <p className="text-center text-lg">Loading...</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-lg">Tidak ada pesanan.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-pink-500"
                    >
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-pink-600">
                                Order #{order.id} 🎉
                            </h2>
                            <p className="text-gray-700">
                                Customer:{" "}
                                <span className="font-medium">{order.customer_name}</span>
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-pink-500 mb-2">
                                Produk Pesanan:
                            </h3>
                            {order.OrderDetails.map((detail, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                                >
                                    <div>
                                        <p className="text-gray-800">
                                            {products[detail.product_id]?.name || "Loading..."}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Qty: {detail.quantity}
                                        </p>
                                    </div>
                                    <div className="text-lg font-bold text-pink-600">
                                        Rp {detail.price.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleDownloadReceipt(order.id)}
                            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                        >
                            Download Receipt
                        </button>
                    </div>
                ))
            )}
        </div>

    );
};

export default Pesanan;
