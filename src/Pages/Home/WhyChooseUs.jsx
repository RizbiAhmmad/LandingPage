import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "অরিজিনাল চট্টগ্রামের স্বাদ",
      desc: "আমাদের মসলা তৈরি হয় হাজার বছরের অভিজ্ঞ বাবুর্চিদের হাতে তৈরি রেসিপি অনুসারে, যাতে আপনি ঘরে বসেই আসল মেজবানি স্বাদ উপভোগ করতে পারেন।",
    },
    {
      title: "১০০% খাঁটি উপাদান",
      desc: "কোনো প্রকার কেমিক্যাল, রঙ বা ভেজাল ছাড়া, শুধুমাত্র খাঁটি মসলার সংমিশ্রণে তৈরি।",
    },
    {
      title: "অভিজ্ঞতা ও বিশ্বাস",
      desc: "গত কয়েক বছরে হাজারো ক্রেতারা আমাদের মেজবানি মসলা কিনে সন্তুষ্ট হয়েছেন এবং অনেকেই বারবার অর্ডার করেছেন।",
    },
    {
      title: "সহজ রান্নার জন্য স্পেশাল ব্লেন্ড",
      desc: "বাজারের মসলার মতো আলাদা আলাদা ঝামেলা নেই, আমাদের এক প্যাকেটেই পাবেন সম্পূর্ণ মেজবানি রান্নার সমাধান।",
    },
    {
      title: "Well Health Brand Guarantee",
      desc: "আমাদের প্রতিটি পণ্য ফ্রেশ, হাইজেনিক এবং ট্রাস্টেড সোর্স থেকে সংগ্রহ করে আপনাদের হাতে পৌঁছে দিই।",
    },
  ];

  return (
    <section className="bg-white dark:from-black dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
          মধুকা থেকে কেনো মেজবানি মাংসের মসলা কিনবেন?
        </motion.h2>

        {/* Features */}
        <div className="mt-8 space-y-6 text-left">
          {points.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-3 bg-gradient-to-r from-green-100 to-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
