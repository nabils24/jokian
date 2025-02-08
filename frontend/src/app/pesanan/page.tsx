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
    const [selectedOrder, setSelectedOrder] = useState(null);

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
                    const userOrders = result.data.orders.filter(
                        order => order.customer_name === user.name
                    );
                    // Sort orders by date (newest first)
                    userOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
                    setOrders(userOrders);
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

    // Calculate total amount for an order
    const calculateOrderTotal = (orderDetails) => {
        return orderDetails.reduce((total, detail) => total + (detail.price * detail.quantity), 0);
    };

    // Format date to readable format
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-24 px-4 md:px-8 py-8 bg-gradient-to-b from-pink-100 to-pink-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-pink-800">Riwayat Pesanan 🍨</h1>
                        <p className="text-pink-600">Total Pesanan: {orders.length}</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-600">Belum ada pesanan</h3>
                            <p className="text-gray-500 mt-2">Yuk, pesan ice cream favoritmu!</p>
                            <a href="/" className="mt-4 inline-block px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
                                Pesan Sekarang
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="bg-pink-500 text-white px-6 py-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">Order #{order.id}</h3>
                                            <p className="text-sm opacity-90">{formatDate(order.order_date)}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDownloadReceipt(order.id)}
                                            className="bg-white text-pink-500 px-4 py-2 rounded-full hover:bg-pink-100 transition-colors"
                                        >
                                            Download Receipt
                                        </button>
                                    </div>

                                    <div className="divide-y divide-gray-200">
                                        {order.OrderDetails.map((detail, index) => (
                                            <div key={index} className="p-6 flex items-center justify-between hover:bg-pink-50">
                                                <div className="flex items-center space-x-4">
                                                    {products[detail.product_id]?.image && (
                                                        <img
                                                            src={products[detail.product_id].image}
                                                            alt={products[detail.product_id]?.name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                    )}
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">
                                                            {products[detail.product_id]?.name || 'Loading...'}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {detail.quantity} x Rp {detail.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-pink-600">
                                                    Rp {(detail.quantity * detail.price).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-pink-50 px-6 py-4 flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Total Pembayaran</span>
                                        <span className="font-bold text-lg text-pink-600">
                                            Rp {calculateOrderTotal(order.OrderDetails).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Pesanan;