"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrderStatusAction } from "../../../../actions/order";

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: number; currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    const toastId = toast.loading(`Updating order #${orderId}...`);

    const result = await updateOrderStatusAction(orderId, newStatus);

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
      disabled={isUpdating || currentStatus === "DELIVERED"}
    >
      <SelectTrigger className="w-35 h-8 text-xs font-semibold">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING" className="text-yellow-600">PENDING</SelectItem>
        <SelectItem value="SHIPPED" className="text-blue-600">SHIPPED</SelectItem>
        <SelectItem value="DELIVERED" className="text-green-600">DELIVERED</SelectItem>
      </SelectContent>
    </Select>
  );
}