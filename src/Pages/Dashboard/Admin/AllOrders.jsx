import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllOrders = () => {
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get("/orders");
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("❌ Fetch Orders Error:", error);
    }
  };

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
          fetchOrders();
        } catch (error) {
          console.error("❌ Delete Error:", error);
          Swal.fire("Error", "Failed to delete order.", "error");
        }
      }
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosPublic.patch(`/orders/${id}/status`, { status: newStatus });
      Swal.fire("✅ Updated!", `Order status changed to ${newStatus}`, "success");
      fetchOrders();
    } catch (error) {
      console.error("❌ Status Update Error:", error);
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  // Pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

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
              <th className="px-4 py-2">Date & Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <p className="font-semibold">{order.customer?.name}</p>
                  <p className="text-gray-600 text-sm">{order.customer?.phone}</p>
                  <p className="text-gray-500 text-xs">{order.customer?.email}</p>
                </td>

                <td className="px-4 py-2">
                  <p className="text-gray-600 text-sm">Address: {order.customer?.address}</p>
                  <p className="text-gray-600 text-sm">Notes: {order.customer?.notes}</p>
                </td>

                <td className="px-4 py-2">
                  {order.products?.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2 border-b pb-2">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-medium">{p.name} ({p.size})</p>
                        <p className="text-sm text-gray-600">× {p.quantity}</p>
                      </div>
                    </div>
                  ))}
                </td>

                <td className="px-4 py-2 font-semibold">৳ {order.total}</td>

                <td className="px-4 py-2 text-gray-700">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>

                <td className="px-4 py-2">
                  <select
                    value={order.status || "pending"}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`border px-2 py-1 rounded ${
                      order.status === "pending"
                        ? "bg-yellow-100"
                        : order.status === "processing"
                        ? "bg-blue-100"
                        : order.status === "delivered"
                        ? "bg-green-100"
                        : order.status === "canceled"
                        ? "bg-red-100"
                        : "bg-white"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>

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

      {/* Pagination */}
      {orders.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === num + 1
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
