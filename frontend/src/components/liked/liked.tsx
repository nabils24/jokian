"use client";

import React, { useEffect, useState } from "react";

const Liked = () => {
    const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbkw5YW9JNE8yaUtsc2xVT3VZMmFSLkViamxrbnViRXBSUzF0SGdZTEZGMVVsQXpCLy5rR3UiLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI1LTAxLTI5VDEzOjQyOjUwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAxLTI5VDEzOjQyOjUwLjAwMFoifSwiaWF0IjoxNzM4MTU4NTAyfQ.rPM3vJFPQKKI_Jtamq4e-Y9xStPUfENjnTXzyeNkz1Y';
    const [product1, setProduct1] = useState(null);
    const [product2, setProduct2] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch("http://localhost:3001/admin/products/3", {
                    headers: {
                        Authorization:
                            "Bearer " + tokenAdmin,
                    },
                });
                const data = await response.json();

                // Simpan hanya data product ke dalam state
                setProduct1(data.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
        const fetchProduct2 = async () => {
            try {
                const response = await fetch("http://localhost:3001/admin/products/4", {
                    headers: {
                        Authorization:
                            "Bearer " + tokenAdmin,
                    },
                });
                const data = await response.json();

                // Simpan hanya data product ke dalam state
                setProduct2(data.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct2();
    }, []);

    return (
        <div className="bg-pink-200 pb-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-black animate-bounce">
                🍦 Es Krim Yang Bikin Kamu Meleleh! 🍦
            </h2>
            <div className="flex w-full flex-col justify-center gap-4 lg:flex-row">
                <div className="card bg-pink-300 w-96 shadow-xl hover:scale-105 transition-transform">
                    <div className="card-body">
                        {product1 ? (
                            <>
                                <h2 className="card-title">{product1.name} 💃</h2>
                                <p>
                                    {product1.name} yang bikin kamu goyang-goyang sampai lupa diet~
                                </p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    {product1 && (
                        <figure>
                            <img
                                src={product1.image}
                                alt={product1.name}
                                className="w-full h-auto"
                            />
                        </figure>
                    )}
                </div>
                <div className="divider lg:divider-horizontal">Atau</div>
                <div className="card bg-pink-300 w-96 shadow-xl hover:scale-105 transition-transform">
                    <div className="card-body">
                        {product2 ? (
                            <>
                                <h2 className="card-title">{product2.name} 💃</h2>
                                <p>
                                    {product2.name} yang bikin kamu goyang-goyang sampai lupa diet~
                                </p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    {product2 && (
                        <figure>
                            <img
                                src={product2.image}
                                alt={product2.name}
                                className="w-full h-auto"
                            />
                        </figure>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Liked;
