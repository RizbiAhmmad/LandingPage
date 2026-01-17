import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import bannerImg from "../../../src/assets/modhukaBanner.jpg";

const Banner = () => {
  const handleScroll = () => {
    const section = document.getElementById("checkout");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto items-center rounded-md">
      <div className="">
        {/* Optional dark overlay for better text visibility */}
        <div className="py-8 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-bold mb-6 leading-tight"
          >
            চট্টগ্রামের ঐতিহ্যবাহী শাহী মেজবানি মসলা
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-2xl text-red-500 md:text-3xl font-bold mb-4"
          >
            আমরা দিচ্ছি আপনাকে গ্যারান্টি সহ চট্টগ্রামের অরিজিনাল মেজবানি মসলা
          </motion.p>

          <motion.button
            onClick={handleScroll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 inline-flex items-center gap-2 bg-[#E00000] hover:bg-[rgb(203,51,0)] text-white font-extrabold px-10 py-4 rounded-lg shadow-lg border-4 border-[#BD8B44]"
          >
            <ShoppingCart className="w-5 h-5" />
            অর্ডার করতে চাই
          </motion.button>
        </div>
      </div>
      <div>
        <img
          src={bannerImg}
          alt="Banner"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="w-full object-cover h-full rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Banner;
