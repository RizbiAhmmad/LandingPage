import { motion } from "framer-motion";
import img1 from "../../assets/Modhuka1.jpeg";
import img2 from "../../assets/Modhuka2.jpeg";
import img3 from "../../assets/Modhuka3.jpeg";

export default function Gallery() {
  const images = [img1, img2, img3];

  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Gallery Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800  mb-10">
          আমাদের পণ্য গুলো দেখুন
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-100 transition duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            বিশেষ ভিডিও দেখুন
          </h3>
          <motion.div
            className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-70 md:h-100"
              src="https://www.youtube.com/embed/AHIMfFXQQnc"
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
