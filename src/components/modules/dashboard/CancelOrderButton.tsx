"use client";

import Swal from 'sweetalert2';
import { deleteAlertOptions } from "@/lib/alerts";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cancelOrderAction } from "../../../../actions/order";
import { XCircle } from "lucide-react";

export function CancelOrderButton({ orderId }: { orderId: number }) {
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    const result = await Swal.fire(
      deleteAlertOptions(
        "Cancel Order?",
        "You won't be able to revert this action!",
        "Yes, cancel it!"
      )
    );

    if (result.isConfirmed) {
      setIsCancelling(true);
      const toastId = toast.loading("Cancelling order...");
      
      const res = await cancelOrderAction(orderId);
      
      if (res.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success("Order cancelled successfully", { id: toastId });
        router.refresh();
      }
      setIsCancelling(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleCancel} 
      disabled={isCancelling}
      className="h-8 gap-1"
    >
      <XCircle className="h-4 w-4" />
      {isCancelling ? "Cancelling..." : "Cancel Order"}
    </Button>
  );
}
