import { Landmark } from "lucide-react";

export default function PaymentDetails() {
  const paymentAccount = process.env.OPAY_ACCOUNT || "7050337273";

  return (
    <section className="bg-fuchsia/5 border border-fuchsia/20 rounded-xl p-4 sm:p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-fuchsia/10 text-fuchsia p-2.5 rounded-lg">
          <Landmark size={22} />
        </div>
        <h2 className="text-lg sm:text-xl font-bold">How to Pay</h2>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        After placing your order, pay the total amount into the Opay account
        below. Your order is confirmed once payment is received.
      </p>
      <div className="bg-white rounded-lg p-3 sm:p-4 space-y-2 text-sm sm:text-base">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Provider</span>
          <span className="font-bold">Opay</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Account Number</span>
          <span className="font-bold text-fuchsia">{paymentAccount}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Account Name</span>
          <span className="font-bold">Zyeebis Place</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        After payment, send your receipt via WhatsApp so we can confirm and
        schedule your delivery.
      </p>
    </section>
  );
}