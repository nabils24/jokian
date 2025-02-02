import React from 'react';


const Hero = () => {
    return (
        <div className="hero bg-white min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="/hero.png"
                    className="max-w-sm rounded-lg animate-bounce" />
                <div>
                    <h1 className="text-5xl font-bold">Naffie's Ice Cream</h1>
                    <p className="py-6">
                        Dengan rasa yang lezat dan harga yang terjangkau, Naffie's Ice Cream adalah pilihan terbaik untuk Anda yang ingin menikmati es krim yang lezat.
                    </p>
                    <button className="btn btn-lg bg-pink-300 hover:bg-pink-600">Lihat varian eskrim?</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;