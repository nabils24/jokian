"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navigasi/navbar";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await fetch("http://localhost:3001/users/login/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("user", JSON.stringify(data));
                setMessage("Login berhasil!");
                setTimeout(() => {
                    router.push("http://localhost:3000");
                }, 2000);
            } else {
                setMessage(data.message || "Email atau password salah");
            }
        } catch (error) {
            setMessage("Gagal menghubungi server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Masuk Akun</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="input input-bordered w-full" 
                                placeholder="Email Kamu" 
                                required 
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Password</span>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="input input-bordered w-full" 
                                placeholder="Password" 
                                required 
                            />
                        </label>
                        <button 
                            type="submit" 
                            className="btn bg-pink-300 hover:bg-pink-600 w-full"
                            disabled={loading}
                        >
                            {loading ? "Mengirim..." : "Masuk"}
                        </button>
                        {message && (
                            <p className="text-center text-sm mt-2 text-red-500">{message}</p>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}
