interface OrderItem {
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

interface OrderSummary {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryDay: string;
  instructions?: string | null;
  total: number;
  items: OrderItem[];
}

export function buildBusinessNotification(order: OrderSummary): string {
  const lines = [
    `*New Order — ${order.orderNumber}*`,
    ``,
    `*Customer:* ${order.customerName}`,
    `*Phone:* ${order.phone}`,
    `*Address:* ${order.address}`,
    `*Delivery Date:* ${order.deliveryDay}`,
  ];

  if (order.instructions) {
    lines.push(`*Instructions:* ${order.instructions}`);
  }

  lines.push(``, `*Items:*`);

  for (const item of order.items) {
    lines.push(`• ${item.name} × ${item.quantity} = ₦${item.subtotal.toLocaleString()}`);
  }

  lines.push(``, `*Total: ₦${order.total.toLocaleString()}*`);

  return lines.join("\n");
}

export function buildReceiptMessage(orderNumber: string): string {
  return `Hi, I placed order ${orderNumber}. Here is my payment receipt.`;
}

export function whatsappLink(phone: string, message: string): string {
  const clean = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
