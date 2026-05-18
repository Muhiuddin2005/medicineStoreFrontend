"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrderStatusAction } from "../../../../actions/order";
import { ORDER_STATUSES, type OrderStatus } from "@/types";

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: number; currentStatus: OrderStatus }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    const toastId = toast.loading(`Updating order #${orderId}...`);

    const result = await updateOrderStatusAction(orderId, newStatus as OrderStatus);

    if (result.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success(`Order status changed to ${newStatus}`, { id: toastId });
      router.refresh();
    }
    
    setIsUpdating(false);
  };

  return (
    <Select 
      defaultValue={currentStatus} 
      onValueChange={handleStatusChange} 
      disabled={isUpdating || currentStatus === ORDER_STATUSES.DELIVERED || currentStatus === ORDER_STATUSES.CANCELLED}
    >
      <SelectTrigger className="w-35 h-8 text-xs font-semibold">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ORDER_STATUSES.PLACED} className="text-yellow-600">PLACED</SelectItem>
        <SelectItem value={ORDER_STATUSES.PROCESSING} className="text-orange-600">PROCESSING</SelectItem>
        <SelectItem value={ORDER_STATUSES.SHIPPED} className="text-blue-600">SHIPPED</SelectItem>
        <SelectItem value={ORDER_STATUSES.DELIVERED} className="text-green-600">DELIVERED</SelectItem>
        <SelectItem value={ORDER_STATUSES.CANCELLED} className="text-red-600">CANCELLED</SelectItem>
      </SelectContent>
    </Select>
  );
}