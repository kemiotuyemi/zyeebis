import Link from "next/link";
import PaymentDetails from "@/components/payment-details";

export default function Footer() {
  const paymentAccount = process.env.OPAY_ACCOUNT || "7050337273";
  const businessPhone = process.env.BUSINESS_PHONE || "+2348101638706";
  const whatsappNumber = businessPhone.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p className="text-white font-semibold">Zyeebis Place</p>
        <p className="text-sm">
          Choose your preferred delivery date at checkout
        </p>

        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 max-w-sm mx-auto space-y-2">
          <p className="text-white text-sm font-semibold">Pay with Opay</p>
          <p className="text-sm">
            Account Number:{" "}
            <span className="text-fuchsia font-bold">{paymentAccount}</span>
          </p>
          <p className="text-xs text-gray-500">
            Send your receipt via WhatsApp after payment.
          </p>
        </div>

        <p className="text-sm">
          <a href={`tel:${businessPhone}`} className="hover:text-white">
            {businessPhone
              .replace(/\+?(\d{3})(\d{3})(\d{3})(\d{4})/, "+$1 $2 $3 $4")}
          </a>
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            WhatsApp
          </a>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          &copy; {new Date().getFullYear()} Zyeebis Place. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
