import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ALLOWED_DELIVERY_DAYS = [1, 3, 5]; // Mon, Wed, Fri

const orderSchema = z.object({
  customerName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().nullable().optional(),
  address: z.string().min(1),
  deliveryDate: z.string().refine((val) => {
    const d = new Date(val);
    return ALLOWED_DELIVERY_DAYS.includes(d.getDay());
  }, "Delivery must be on Monday, Wednesday, or Friday"),
  instructions: z.string().nullable().optional(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1) })).min(1),
});

function generateOrderNumber(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `ZP-${num}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const productIds = data.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    let subtotal = 0;
    const orderItems = data.items.map((item) => {
      const product = productMap.get(item.productId)!;
      const unitPrice = product.price;
      const itemSubtotal = unitPrice * item.quantity;
      subtotal += itemSubtotal;
      return {
        productId: product.id,
        name: product.name,
        unitPrice,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      };
    });

    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        deliveryDay: data.deliveryDate,
        instructions: data.instructions,
        subtotal,
        total: subtotal,
        status: "new",
        paymentStatus: "pending",
        items: { create: orderItems },
      },
      include: { items: true },
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      total: order.total,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
