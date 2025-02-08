"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navigasi/navbar";
import Footer from "@/components/Footer/footer";
const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [orderLoading, setOrderLoading] = useState(false);

    // Load cart and user data on component mount
    useEffect(() => {
        const storedCart = sessionStorage.getItem("cart");
        const storedUser = sessionStorage.getItem("user");

        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.data.userAdmin);
            setToken(parsedUser.data.token);
        }
    }, []);

    // Update sessionStorage whenever cart changes
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Function to update item quantity
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cart.map(item =>
            item.product_id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
    };

    // Function to remove item from cart
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.product_id !== productId);
        setCart(updatedCart);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Handle checkout
    const handleCheckout = async () => {
        if (!user || !token || cart.length === 0) {
            alert("Silakan login terlebih dahulu atau keranjang kosong");
            return;
        }

        setOrderLoading(true);

        try {
            const orderData = {
                customer_name: user.name,
                order_type: "Delivery",
                order_date: new Date().toISOString().split('T')[0],
                order_detail: cart.map(item => ({
                    product_id: item.product_id,
                    price: item.price,
                    quantity: item.quantity
                }))
            };

            const response = await fetch("http://localhost:3001/admin/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            // Jika berhasil, kosongkan keranjang
            setCart([]);
            alert("Pesanan berhasil dibuat!");
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Terjadi kesalahan saat checkout");
        } finally {
            setOrderLoading(false);
        }
    };

    return (
        <main>
            <Navbar />
            <div className="pt-24 min-h-screen bg-pink-100 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">🛒 Keranjang Belanja</h1>

                    {cart.length === 0 ? (
                        <div className="text-center bg-white rounded-lg shadow-md p-8">
                            <p className="text-xl text-gray-600">Keranjang belanja kosong</p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="mt-4 btn bg-pink-400 text-white hover:bg-pink-500"
                            >
                                Kembali Berbelanja
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                {cart.map((item) => (
                                    <div
                                        key={item.product_id}
                                        className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center gap-4"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-pink-600 font-medium">
                                                Rp {item.price.toLocaleString()}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 rounded-l-md"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-1 border-x">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 rounded-r-md"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.product_id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                Rp {(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>Total Items</span>
                                            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Total Harga</span>
                                            <span>Rp {calculateTotal().toLocaleString()}</span>
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            disabled={orderLoading}
                                            className="w-full btn bg-pink-500 text-white hover:bg-pink-600 mt-4"
                                        >
                                            {orderLoading ? "Memproses..." : "Checkout"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default CartPage;