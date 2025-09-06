import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="max-w-5xl mx-auto items-center rounded-md mt-4"
      
    >
      <div className="">
      {/* Optional dark overlay for better text visibility */}
      <div className="py-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          খাঁটি ও সুগন্ধি চট্টগ্রামের মেজবানি মাংসের মসলা - রান্নায় আনুন ঐতিহ্যের স্বাদ
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
          className="bg-[#CE4F26] text-white text-2xl font-extrabold px-12 py-4 rounded-full shadow-md hover:bg-[#a4401e] transition border-4 border-[#BD8B44]"
        >
          Order Now
        </motion.button>
      </div>

     
      
      </div>
       <div>
        <img
          src="https://suhana.com/cdn/shop/articles/Garam-to-chat-500x380-2.png?v=1709544704"
          alt="Banner"
          className="w-full object-cover h-full rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Banner;
