import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  const status = params.get("status");
  const paymentID = params.get("paymentID");

  useEffect(() => {
    if (status === "success") {
      Swal.fire("Success", "Payment Completed!", "success");
    } else {
      Swal.fire("Failed", "Payment Failed!", "error");
    }
  }, [status]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Processing Payment…</h1>
      <p>Please wait…</p>
    </div>
  );
}
