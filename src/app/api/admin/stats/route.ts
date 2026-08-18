import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      todayOrders: orders.filter((o) => o.createdAt >= today).length,
      pendingOrders: orders.filter((o) => o.status === "new").length,
      awaitingPayment: orders.filter((o) => o.paymentStatus === "pending" && o.status !== "cancelled").length,
      preparing: orders.filter((o) => o.status === "preparing").length,
      completed: orders.filter((o) => o.status === "delivered").length,
      totalSales: orders
        .filter((o) => o.paymentStatus === "confirmed")
        .reduce((sum, o) => sum + o.total, 0),
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
