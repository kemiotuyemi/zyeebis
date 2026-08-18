import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { buildBusinessNotification, buildReceiptMessage, whatsappLink } from "@/lib/whatsapp";

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-NG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const order = await prisma.order
    .findUnique({
      where: { orderNumber },
      include: { items: true },
    })
    .catch(() => null);

  if (!order) notFound();

  const paymentAccount = process.env.OPAY_ACCOUNT || "7050337273";
  const businessPhone = process.env.BUSINESS_PHONE || "+2347050337273";

  const bizMessage = buildBusinessNotification({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    phone: order.phone,
    address: order.address,
    deliveryDay: formatDate(order.deliveryDay),
    instructions: order.instructions,
    total: order.total,
    items: order.items.map((i) => ({
      name: i.name,
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      subtotal: i.subtotal,
    })),
  });
  const bizWhatsappLink = whatsappLink(businessPhone, bizMessage);

  const receiptMessage = buildReceiptMessage(order.orderNumber);
  const customerWhatsappLink = whatsappLink(businessPhone, receiptMessage);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <CheckCircle size={64} className="mx-auto text-green-500" />
          <h1 className="text-2xl font-bold mt-4">Order Received!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for ordering from Zyeebis Place.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-bold">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Date:</span>
              <span className="font-semibold">{formatDate(order.deliveryDay)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold text-fuchsia text-lg">
                ₦{order.total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-fuchsia/5 border border-fuchsia/20 rounded-lg p-4 mt-6 text-left">
            <h2 className="font-bold text-fuchsia mb-2">Payment Details</h2>
            <p className="text-sm">
              <strong>Provider:</strong> Opay
            </p>
            <p className="text-sm">
              <strong>Account Number:</strong> {paymentAccount}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Please transfer the exact order amount to the account above.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={customerWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Send Receipt via WhatsApp
            </a>
            <a
              href={bizWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-fuchsia text-white py-3 rounded-lg font-semibold hover:bg-fuchsia-dark transition-colors"
            >
              Notify Zyeebis Place
            </a>
            <Link
              href="/"
              className="block w-full border border-fuchsia text-fuchsia py-3 rounded-lg font-semibold hover:bg-fuchsia/5 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
