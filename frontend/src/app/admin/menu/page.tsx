"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function MenuPage() {
    // State declarations
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        type: "",
        size: "",
        price: "",
        image: null,
    });

    // Preview untuk gambar
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // Ambil data user dari sessionStorage
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.data.userAdmin);
            setToken(parsedUser.data.token);
        }
    }, []);

    // Fetch data menu
    useEffect(() => {
        if (!token) return;

        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3001/admin/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (result.status && result.data.product) {
                    setMenuItems(result.data.product);
                }
            } catch (error) {
                console.error("Gagal mengambil data produk:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [token]);

    // Modal handlers
    const openAddModal = () => {
        setIsAddModalOpen(true);
        setImagePreview(null);
    };

    const closeAddModal = () => {
        setNewItem({
            name: "",
            type: "",
            size: "",
            price: "",
            image: null,
        });
        setImagePreview(null);
        setIsAddModalOpen(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const openEditModal = (item) => {
        setCurrentItem(item);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setCurrentItem(null);
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
    };

    // Form handlers
    const handleAddChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "image") {
            if (files && files[0]) {
                const previewUrl = URL.createObjectURL(files[0]);
                setImagePreview(previewUrl);
                setNewItem({ ...newItem, image: files[0] });
            }
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    // API handlers
    const handleAddSubmit = async (event) => {
        event.preventDefault();

        if (!newItem.name || !newItem.price || !newItem.image) {
            alert("Mohon lengkapi semua field yang diperlukan");
            return;
        }

        const formData = new FormData();
        formData.append("name", newItem.name);
        formData.append("type", newItem.type);
        formData.append("size", newItem.size);
        formData.append("price", newItem.price);
        formData.append("gambar", newItem.image);

        try {
            const response = await axios.post(
                "http://localhost:3001/admin/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.status) {
                setMenuItems([...menuItems, response.data.data.product]);
                closeAddModal();
                if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                }
            }
        } catch (error) {
            console.error("Gagal menambah data produk:", error);
            alert("Gagal menambah produk. Silakan coba lagi.");
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3001/admin/products/${currentItem.id}`,
                currentItem,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status) {
                setMenuItems(
                    menuItems.map((item) =>
                        item.id === currentItem.id ? currentItem : item
                    )
                );
                closeEditModal();
            }
        } catch (error) {
            console.error("Gagal mengupdate data produk:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/admin/products/${itemToDelete.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.status) {
                setMenuItems(
                    menuItems.filter((item) => item.id !== itemToDelete.id)
                );
                closeDeleteModal();
            }
        } catch (error) {
            console.error("Gagal menghapus data produk:", error);
        }
    };

    // Loading and empty states
    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (menuItems.length === 0) {
        return <div className="text-center py-8">No menu items available.</div>;
    }

    // Render component
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
                Selamat Datang di Menu 🎉
            </h1>

            {/* Add Menu Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={openAddModal}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Tambah Menu
                </button>
            </div>

            {/* Menu Items Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-lg border border-pink-300 p-4 flex flex-col justify-between hover:scale-105 transition transform"
                    >
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                        ) : (
                            <div className="w-full h-40 bg-pink-100 flex items-center justify-center rounded-md mb-4">
                                <span className="text-pink-500 text-lg">No Image</span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-bold text-pink-600 mb-2">
                                {item.name}
                            </h2>
                            <p className="text-gray-700 mb-1">
                                Tipe: {item.type || "-"}
                            </p>
                            <p className="text-gray-700 mb-1">
                                Ukuran: {item.size || "-"}
                            </p>
                            <p className="text-gray-800 font-semibold mb-4">
                                Harga: Rp {item.price}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => openEditModal(item)}
                                className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => openDeleteModal(item)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-x-auto">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-pink-600 mb-4">
                            Tambah Menu Item 🎈
                        </h2>
                        <form onSubmit={handleAddSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Nama Menu *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={newItem.name}
                                        onChange={handleAddChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Tipe
                                    </label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={newItem.type}
                                        onChange={handleAddChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Ukuran
                                    </label>
                                    <input
                                        type="text"
                                        name="size"
                                        value={newItem.size}
                                        onChange={handleAddChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Harga *
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        required
                                        value={newItem.price}
                                        onChange={handleAddChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Gambar *
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        ref={fileInputRef}
                                        required
                                        accept="image/png, image/jpeg"
                                        onChange={handleAddChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full max-h-24 object-contain rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-pink-600 mb-4">
                            Edit Menu Item ✨
                        </h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Nama Menu
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentItem.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Harga
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={currentItem.price}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-pink-600 mb-4">
                            Hapus Menu Item 😢
                        </h2>
                        <p className="mb-6">
                            Apakah Anda yakin ingin menghapus item ini?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
