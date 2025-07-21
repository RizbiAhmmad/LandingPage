import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat text-white py-20"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/007/448/146/small_2x/digital-transformation-technology-strategy-the-transformation-of-ideas-and-the-adoption-of-technology-in-business-in-the-digital-age-enhancing-global-business-capabilities-ai-photo.jpg')`,
      }}
    >
      {/* Optional dark overlay for better text visibility */}
      <div className="py-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Grow Your Business with Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl mb-8"
        >
          We build modern websites that bring your brand to life.
        </motion.p>

        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Banner;
