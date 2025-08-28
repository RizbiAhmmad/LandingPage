import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className=""
      
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center rounded-md mt-4">
      {/* Optional dark overlay for better text visibility */}
      <div className="py-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Modhuka
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl mb-8"
        >
          We Provide you the best Masala.
        </motion.p>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Order Now
        </motion.button>
      </div>

      <div>
        <img
          src="https://suhana.com/cdn/shop/articles/Garam-to-chat-500x380-2.png?v=1709544704"
          alt="Banner"
          className="w-full h-[400px] rounded-md shadow-md"
        />
      </div>
      
      </div>
    </div>
  );
};

export default Banner;
