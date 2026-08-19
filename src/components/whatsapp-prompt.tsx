"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppPromptProps {
  orderNumber: string;
  total: number;
  customerName: string;
  deliveryDate: string;
  items: { name: string; quantity: number; subtotal: number }[];
  whatsappLink: string;
}

export default function WhatsAppPrompt({
  orderNumber,
  total,
  customerName,
  deliveryDate,
  items,
  whatsappLink,
}: WhatsAppPromptProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 m-0 sm:m-4">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <MessageCircle size={28} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Send Order via WhatsApp?</h2>
            <p className="text-sm text-gray-500">
              Send your order details to Zyeebis Place to confirm it.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mt-4 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Order:</span>
            <span className="font-semibold">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Customer:</span>
            <span className="font-semibold">{customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery:</span>
            <span className="font-semibold">{deliveryDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total:</span>
            <span className="font-bold text-fuchsia">
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors min-h-[48px]"
          >
            <MessageCircle size={18} />
            Send via WhatsApp
          </a>
          <button
            onClick={() => setOpen(false)}
            className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors min-h-[48px]"
          >
            I'll do it later
          </button>
        </div>
      </div>
    </div>
  );
}
