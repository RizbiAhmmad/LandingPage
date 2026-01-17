import { motion } from "framer-motion";
import img1 from "../../assets/Modhuka11.jpg";
import img2 from "../../assets/Modhuka1.jpeg";

export default function Gallery() {
  const images = [
    { src: img1, weight: " ৫০০ গ্রাম" },
    { src: img2, weight: "২৫০ গ্রাম" },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Gallery Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          আমাদের পণ্য গুলো দেখুন
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Image Container */}
              <div className="relative group">
                <img
                  src={item.src}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-180 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-20 transition duration-500" />
              </div>

              {/* Weight Section */}
              <div className="py-3 bg-gray-100 dark:bg-gray-700">
                <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                  ওজন: {item.weight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-10">
            মেজবানি রান্নার রেসিপি ভিডিও দেখুন
          </h3>
          <motion.div
            className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <iframe
              loading="lazy"
              className="w-full h-[400px]"
              src="https://www.youtube.com/embed/M0kwZLB0RWY"
              title="Special Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
