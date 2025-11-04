import React from "react";
import { CheckCircle } from "lucide-react";

export default function SpiceSection() {
  return (
    <section className="bg-white py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ঝাল, ঝাঁজ ও ঘ্রাণে অনন্য – মেজবানি স্পেশাল মসলা 🔥
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
            বন্দরনগরী{" "}
            <span className="font-semibold">চট্টগ্রামের আসল স্বাদ</span>– বাছাই
            করা <span className="font-semibold">১৯ ধরনের প্রিমিয়াম উপকরণ</span>{" "}
            দিয়ে তৈরি বিশেষ মেজবানি মাংসের মসলা।
          </p>
        </div>

        {/* Ingredients */}
        <div className="bg-green-100 p-6 rounded-2xl shadow-md mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-5 text-center">
            উপকরণ সমূহ
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
            <p>শাহী জিরা</p>
            <p>জিরা</p>
            <p>মৌরি</p>
            <p>সবুজ এলাচ</p>
            <p>শাহী এলাচ</p>
            <p>সাদা গোল মরিচ</p>
            <p>কালো গোল মরিচ</p>
            <p>স্টার এনিস</p>
            <p>কাবাব চিনি</p>
            <p>একাঠফল</p>
            <p>দারুচিনি</p>
            <p>লবঙ্গ</p>
            <p>জয়ফল</p>
            <p>যয়ত্রিক</p>
            <p>রাঙ্গুনি</p>
            <p>জয়ন</p>
            <p>ধনিয়া</p>
            <p>সরিষা</p>
            <p>আদাসুর</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 bg-red-50 p-4 rounded-xl shadow-sm">
            <CheckCircle className="text-red-500 w-6 h-6 mt-1 flex-shrink-0" />
            <p className="text-gray-800">
              আমরা সরাসরি <span className="font-semibold">চট্টগ্রাম</span> থেকে
              উৎপাদন করি এবং সেখান থেকে সারা দেশে{" "}
              <span className="font-semibold">হোম ডেলিভারি</span> দিই।
            </p>
          </div>
          <div className="flex items-start gap-3 bg-red-50 p-4 rounded-xl shadow-sm">
            <CheckCircle className="text-red-500 w-6 h-6 mt-1 flex-shrink-0" />
            <p className="text-gray-800">
              এই মসলার <span className="font-semibold">ঘ্রাণ অসাধারণ</span>, যা
              সাধারণ মসলায় পাবেন না। এই মসলা রান্না করলে স্বাদ হবে{" "}
              <span className="font-semibold">
                চট্টগ্রামের বাবুর্চিদের মেজবানি রান্নার মতো সুস্বাদু।
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
