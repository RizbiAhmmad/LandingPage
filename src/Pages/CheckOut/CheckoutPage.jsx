import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function CheckoutPage() {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [shipping, setShipping] = useState(120);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  // Fetch products from backend
  useEffect(() => {
    axiosPublic
      .get("/products")
      .then((res) => {
        const modified = res.data.map((p, index) => ({
          ...p,
          quantity: 1,
          selected: index === 0,
        }));
        setProducts(modified);
      })
      .catch((err) => console.error(err));
  }, []);

  const subtotal = products
    .filter((p) => p.selected)
    .reduce((acc, p) => acc + p.price * p.quantity, 0);

  const total = subtotal + (shipping || 0);

  // Handle billing input
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Quantity পরিবর্তন
  const updateQuantity = (id, type) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              quantity:
                type === "inc" ? p.quantity + 1 : Math.max(1, p.quantity - 1),
            }
          : p,
      ),
    );
  };

  // Product select/unselect
  const toggleSelect = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p._id === id) {
          const updated = { ...p, selected: !p.selected };

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "product_select",
            product_name: p.name,
            price: p.price,
            selected: updated.selected,
          });

          return updated;
        }
        return p;
      }),
    );
  };

  const handleBkashPayment = async () => {
    try {
      const res = await axiosPublic.post("/bkash-checkout", {
        amount: total, // total order amount
        orderID: "ORDER_" + Date.now(),
        reference: customer.phone,
        callbackURL: "https://node.modhuka.com/bkash-callback",
      });

      if (res.data && res.data.bkashURL) {
        window.location.href = res.data.bkashURL; // redirect to bKash page
      } else {
        Swal.fire("Error", "bKash URL পাওয়া যায়নি!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "bKash Payment শুরু করতে সমস্যা হয়েছে", "error");
    }
  };

  // Submit order
  const handleSubmit = async () => {
    const selectedProducts = products.filter((p) => p.selected);

    // === Validation ===
    if (!customer.name || !customer.phone || !customer.address) {
      Swal.fire("⚠️ Required!", "সবগুলো * চিহ্নিত ফিল্ড পূরণ করুন।", "warning");
      return;
    }

    if (selectedProducts.length === 0) {
      Swal.fire(
        "⚠️ পণ্য নেই!",
        "কমপক্ষে একটি প্রোডাক্ট সিলেক্ট করুন।",
        "warning",
      );
      return;
    }

    if (!shipping) {
      Swal.fire("⚠️ শিপিং মিসিং!", "একটি শিপিং অপশন সিলেক্ট করুন।", "warning");
      return;
    }

    const orderData = {
      customer,
      products: selectedProducts,
      shipping,
      subtotal,
      total,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axiosPublic.post("/orders", orderData);

      // GTM purchase event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        transaction_id: "ORDER_" + Date.now(),
        value: total,
        shipping: shipping,
        items: selectedProducts.map((p) => ({
          item_name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
      });

      //  Success message
      Swal.fire("✅ Success!", "অর্ডার সফলভাবে প্লেস হয়েছে।", "success");

      //Reset form
      setCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
      });

      setProducts((prev) =>
        prev.map((p) => ({ ...p, selected: false, quantity: 1 })),
      );

      setShipping("");
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error!", "অর্ডার প্লেস করতে সমস্যা হয়েছে।", "error");
    }
  };

  return (
    <section id="checkout" className="bg-white py-6 px-4">
      <div className="max-w-3xl border-2 border-red-200 mx-auto text-center p-4 mb-8 rounded-md">
        <h1 className="text-3xl font-bold mb-4">
          আপনার অর্ডার সম্পূর্ণ করতে নিচের ফর্মটি পূরণ করুন।
        </h1>

        <a
          href="tel:01837840903"
          className="inline-block bg-[#E00000] hover:bg-[rgb(203,51,0) text-white text-2xl font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          📞 প্রয়োজনে কল করুন: 01837840903
        </a>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 border-2 border-red-200 p-4 rounded-md">
        {/* Left Side - Billing & Shipping */}
        <div className="space-y-6">
          {/* Product List */}
          <div>
            <h2 className="text-xl font-bold mb-4">প্রোডাক্ট সিলেক্ট করুন</h2>
            <div className="space-y-3 border rounded-md p-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <input
                    type="checkbox"
                    checked={p.selected}
                    onChange={() => toggleSelect(p._id)}
                    className="w-8 h-8 accent-green-500 cursor-pointer"
                  />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-bold">
                      {p.name} ({p.size})
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-3">
                        <button
                          className="px-3 py-2 bg-gray-300 text-xl font-bold rounded-lg hover:bg-gray-400 transition"
                          onClick={() => updateQuantity(p._id, "dec")}
                          disabled={!p.selected}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {p.quantity}
                        </span>
                        <button
                          className="px-3 py-2 bg-gray-300 text-xl font-bold rounded-lg hover:bg-gray-400 transition"
                          onClick={() => updateQuantity(p._id, "inc")}
                          disabled={!p.selected}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold">
                        ৳ {p.price * p.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Form */}
          <div>
            <h2 className="text-xl font-bold mb-4">Billing & Shipping</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম *"
                className="w-full border p-3 rounded-md"
                value={customer.name}
                onChange={handleChange}
              />
              <input
                type="number"
                name="phone"
                placeholder="মোবাইল নম্বর *"
                className="w-full border p-3 rounded-md"
                value={customer.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="ইমেইল "
                className="w-full border p-3 rounded-md"
                value={customer.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="আপনার ঠিকানা *"
                className="w-full border p-3 rounded-md"
                value={customer.address}
                onChange={handleChange}
              />
              <textarea
                name="notes"
                placeholder="Order notes (optional)"
                className="w-full border p-3 rounded-md"
                value={customer.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-xl font-bold mb-4">Shipping</h2>
            <div className="space-y-3 border rounded-md p-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 120}
                  onChange={() => setShipping(120)}
                  className="scale-125 accent-red-600 cursor-pointer"
                />
                <span>চট্টগ্রামের বাইরে: ৳ 120</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 70}
                  onChange={() => setShipping(70)}
                  className="scale-125 accent-red-600 cursor-pointer"
                />
                <span>চট্টগ্রামের মধ্যে: ৳ 70</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="border rounded-md p-6 space-y-6">
          <h2 className="text-xl font-bold">Your order</h2>
          <div className="space-y-3">
            {products
              .filter((p) => p.selected)
              .map((p) => (
                <div key={p._id} className="flex justify-between">
                  <span>
                    {p.name} × {p.quantity}
                  </span>
                  <span>৳ {p.price * p.quantity}</span>
                </div>
              ))}
            <hr />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳ {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>৳ {shipping}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>
          </div>

          {/* Payment Option */}
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700">
            <p className="font-semibold mb-2">Cash on delivery</p>

            <p className="text-red-600">
              ১০০% নিশ্চিন্তে অর্ডার করুন। পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে
              পেমেন্ট করতে পারবেন।
            </p>
          </div>
          {/* <button
            onClick={handleBkashPayment}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg"
          >
            Pay with bKash
          </button> */}

          <button
            onClick={handleSubmit}
            className="w-full bg-[#E00000] hover:bg-[rgb(203,51,0)] text-white font-extrabold px-8 py-3 rounded-lg shadow-lg border-4 border-[#BD8B44] "
          >
            অর্ডার করুন ৳ {total}
          </button>
        </div>
      </div>
    </section>
  );
}
