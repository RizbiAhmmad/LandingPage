import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("❌ Fetch Orders Error:", error);
    }
  };

  // delete order
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/orders/${id}`);
          Swal.fire("Deleted!", "Order has been deleted.", "success");
          fetchOrders(); // reload list
        } catch (error) {
          console.error("❌ Delete Error:", error);
          Swal.fire("Error", "Failed to delete order.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Orders</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                {/* Customer Info */}
                <td className="px-4 py-2">
                  <p className="font-semibold">{order.customer?.name}</p>
                  <p className="text-gray-600 text-sm">
                    {order.customer?.phone}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {order.customer?.email}
                  </p>
                </td>

                {/* Address */}
                <td className="px-4 py-2">
                  <p className="text-gray-600 text-sm">
                    Address: {order.customer?.address}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Notes: {order.customer?.notes}
                  </p>
                </td>
                {/* Products */}
                <td className="px-4 py-2">
                  {order.products?.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 mb-2 border-b pb-2"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">
                          {p.name} ({p.size})
                        </p>
                        <p className="text-sm text-gray-600">× {p.quantity}</p>
                      </div>
                    </div>
                  ))}
                </td>

                {/* Total */}
                <td className="px-4 py-2 font-semibold">৳ {order.total}</td>

                {/* Action */}
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-6 text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
