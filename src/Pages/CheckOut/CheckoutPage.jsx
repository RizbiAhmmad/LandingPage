import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [shipping, setShipping] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        // add "selected" and "quantity" field for frontend state
        const modified = res.data.map((p) => ({
          ...p,
          quantity: 1,
          selected: false,
        }));
        setProducts(modified);
      })
      .catch((err) => console.error(err));
  }, []);

  // শুধু selected product এর উপর ভিত্তি করে হিসাব হবে
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
          : p
      )
    );
  };

  // Product select/unselect
  const toggleSelect = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  // Submit order
  const handleSubmit = async () => {
    const selectedProducts = products.filter((p) => p.selected);
    if (selectedProducts.length === 0) {
      alert("কমপক্ষে একটি প্রোডাক্ট সিলেক্ট করুন!");
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
      const res = await axios.post("http://localhost:5000/orders", orderData);
      alert("Order placed successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-white dark:bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 border border-green-200 p-4 rounded-md">
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
                  />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-medium">
                      {p.name} ({p.size})
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(p._id, "dec")}
                          disabled={!p.selected}
                        >
                          -
                        </button>
                        <span>{p.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(p._id, "inc")}
                          disabled={!p.selected}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold">
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
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="মোবাইল নম্বর *"
                className="w-full border p-3 rounded-md"
                value={customer.phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="ইমেইল *"
                className="w-full border p-3 rounded-md"
                value={customer.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="আপনার ঠিকানা *"
                className="w-full border p-3 rounded-md"
                value={customer.address}
                onChange={handleChange}
                required
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
                />
                <span>ঢাকার বাইরে: ৳ 120</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 70}
                  onChange={() => setShipping(70)}
                />
                <span>ঢাকার মধ্যে: ৳ 70</span>
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
              ১০০% নিশ্চিত হয়ে অর্ডার করুন। পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে
              পেমেন্ট করতে পারবেন।
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600"
          >
            অর্ডার করুন ৳ {total}
          </button>
        </div>
      </div>
    </section>
  );
}
