import { notFound } from "next/navigation";
import { getOrderTimeline } from "../../../../actions/order";
import { OrderTracker } from "@/components/modules/dashboard/OrderTracker";
import { ORDER_STATUSES, type OrderStatus } from "@/types";

export default async function OrderTimelinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);

  if (Number.isNaN(orderId)) {
    notFound();
  }

  const result = await getOrderTimeline(orderId);
  const order = result.data as { status: OrderStatus; createdAt: string; updatedAt: string } | null;

  if (!order || !(Object.values(ORDER_STATUSES) as string[]).includes(order.status)) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <OrderTracker status={order.status} createdAt={order.createdAt} updatedAt={order.updatedAt} />
    </div>
  );
}
