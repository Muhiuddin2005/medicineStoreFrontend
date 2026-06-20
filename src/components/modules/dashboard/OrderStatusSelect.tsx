"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Play, Truck, CheckCircle, XCircle } from "lucide-react";
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

  const renderCurrentStatusBadge = () => {
    switch (currentStatus) {
      case ORDER_STATUSES.PLACED:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
            PLACED
          </span>
        );
      case ORDER_STATUSES.PROCESSING:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
            PROCESSING
          </span>
        );
      case ORDER_STATUSES.SHIPPED:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
            SHIPPED
          </span>
        );
      case ORDER_STATUSES.DELIVERED:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
            DELIVERED
          </span>
        );
      case ORDER_STATUSES.CANCELLED:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
            CANCELLED
          </span>
        );
      default:
        return null;
    }
  };

  if (currentStatus === ORDER_STATUSES.DELIVERED || currentStatus === ORDER_STATUSES.CANCELLED) {
    return <div className="flex items-center">{renderCurrentStatusBadge()}</div>;
  }

  return (
    <div className="flex items-center gap-3">
      <div>{renderCurrentStatusBadge()}</div>
      
      <div className="flex items-center gap-2">
        {currentStatus === ORDER_STATUSES.PLACED && (
          <>
            <button
              onClick={() => handleStatusChange(ORDER_STATUSES.PROCESSING)}
              disabled={isUpdating}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_10px_rgba(249,115,22,0.2)]"
            >
              <Play className="h-3 w-3 fill-white" />
              Process
            </button>
            <button
              onClick={() => handleStatusChange(ORDER_STATUSES.CANCELLED)}
              disabled={isUpdating}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 border border-red-500/20 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <XCircle className="h-3 w-3" />
              Cancel
            </button>
          </>
        )}

        {currentStatus === ORDER_STATUSES.PROCESSING && (
          <>
            <button
              onClick={() => handleStatusChange(ORDER_STATUSES.SHIPPED)}
              disabled={isUpdating}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.2)]"
            >
              <Truck className="h-3 w-3" />
              Ship
            </button>
            <button
              onClick={() => handleStatusChange(ORDER_STATUSES.CANCELLED)}
              disabled={isUpdating}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 border border-red-500/20 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <XCircle className="h-3 w-3" />
              Cancel
            </button>
          </>
        )}

        {currentStatus === ORDER_STATUSES.SHIPPED && (
          <button
            onClick={() => handleStatusChange(ORDER_STATUSES.DELIVERED)}
            disabled={isUpdating}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-green-600 hover:bg-green-700 text-white transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_10px_rgba(34,197,94,0.2)]"
          >
            <CheckCircle className="h-3 w-3" />
            Deliver
          </button>
        )}
      </div>
    </div>
  );
}