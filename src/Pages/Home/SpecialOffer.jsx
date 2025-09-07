import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function SpecialOffer() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center relative">
        {/* Old Price with cross animation */}
        <motion.p
          className="text-lg md:text-4xl text-gray-700 dark:text-gray-300 relative inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          জনপ্রিয় এই মসলার পূর্বের মূল্য{" "}
          <span className="relative inline-block text-red-600 font-bold">
            ১৪০০/-
            {/* Animated Cross (X) */}
            <motion.svg
              viewBox="0 0 120 40"
              className="absolute -top-2 left-0 w-full h-full text-red-600"
            >
              {/* First diagonal line */}
              <motion.line
                x1="0"
                y1="0"
                x2="120"
                y2="40"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1, // একটু gap রেখে আবার শুরু হবে
                }}
              />
              {/* Second diagonal line */}
              <motion.line
                x1="0"
                y1="40"
                x2="120"
                y2="0"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </motion.svg>
          </span>{" "}
          টাকা
        </motion.p>

        {/* New Price with circle highlight animation */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-red-500 mt-6 relative inline-block"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          আজকের অফার মূল্য মাত্র{" "}
          <span className="relative inline-block">
            <motion.span
              className="text-green-600 text-4xl md:text-5xl font-extrabold relative z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ১১০০/-
            </motion.span>

            {/* Circle highlight */}
            <motion.svg
              viewBox="0 0 200 100"
              className="absolute -top-8 -left-8 w-52 h-28 text-red-500"
            >
              <motion.ellipse
                cx="100"
                cy="50"
                rx="90"
                ry="40"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </motion.svg>
          </span>{" "}
          টাকা
        </motion.h2>

        {/* Sub Text */}
        <motion.p
          className="text-2xl my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-red-500 font-bold">অফারটি লুফে নিতে</span>{" "}
          <span className="text-green-600 font-bold">“অর্ডার করতে চাই”</span>{" "}
          বাটনে ক্লিক করুন
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 inline-flex items-center gap-2 bg-[#E00000] hover:bg-[rgb(203,51,0)] text-white font-extrabold px-10 py-4 rounded-lg shadow-lg border-4 border-[#BD8B44]"
        >
          <ShoppingCart className="w-5 h-5" />
          অর্ডার করতে চাই
        </motion.button>
      </div>
    </section>
  );
}
