import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  // fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosPublic.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Fetch Products Error:", error);
    }
  };

  // delete product
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/products/${id}`);
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          fetchProducts(); // reload list
        } catch (error) {
          console.error("❌ Delete Error:", error);
          Swal.fire("Error", "Failed to delete product.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 font-semibold">{p.name}</td>
                <td className="px-4 py-2">৳ {p.price}</td>
                <td className="px-4 py-2">{p.size}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      p.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;