import React, { useState, useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    size: "",
    status: "active",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return Swal.fire("Error", "Please select an image", "error");
    }

    setLoading(true);
    try {
      // Upload image to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append("upload_preset", "landing-page");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dt3bgis04/image/upload",
        cloudinaryData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // Final product object
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageUrl,
        email: user?.email,
        createdAt: new Date(),
      };

      // Save to backend
      const res = await axios.post(
        "http://localhost:5000/products",
        productData
      );

      if (res.data.insertedId) {
        Swal.fire("Success", "Product added successfully!", "success");
        setFormData({
          name: "",
          price: "",
          size: "",
          status: "active",
          description: "",
        });
        setImageFile(null);
        navigate("/dashboard/allProducts");
      } else {
        Swal.fire("Error", "Server error. Product not added.", "error");
      }
    } catch (err) {
      console.error("❌ Add Product Error:", err.response?.data || err.message);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price (৳)</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Ex: 1 KG / 500 GRAM"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="image"
              className="px-4 py-2 text-white transition bg-cyan-500 rounded-lg shadow cursor-pointer hover:bg-cyan-600"
            >
              Choose File
            </label>
            <span className="text-sm text-gray-600">
              {imageFile ? imageFile.name : "No file chosen"}
            </span>
          </div>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
            className="hidden"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-cyan-500 rounded hover:bg-cyan-600"
        >
          {loading ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
