"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { toggleUserStatusAction } from "../../../../actions/user";
import { ROLES, type Role } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ShieldAlert, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";
import { confirmAlertOptions } from "@/lib/alerts";

export function UserStatusToggle({ userId, currentStatus, userRole }: { userId: string, currentStatus: boolean, userRole: Role }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleToggle = async (targetStatus: boolean) => {
    if (userRole === ROLES.ADMIN) {
      toast.error("Cannot change the status of an Admin!");
      return;
    }

    if (targetStatus === currentStatus) return;

    const result = await Swal.fire(
      confirmAlertOptions(
        targetStatus ? "Activate User?" : "Block User?",
        targetStatus
          ? "Are you sure you want to activate this user? They will regain full access to their account."
          : "Are you sure you want to block this user? They will lose all access to their account.",
        targetStatus ? "Yes, Activate" : "Yes, Block User",
        !targetStatus
      )
    );

    if (!result.isConfirmed) return;

    setIsUpdating(true);
    const toastId = toast.loading(`Updating status...`);

    const resultAction = await toggleUserStatusAction(userId, targetStatus);

    if (resultAction.error) {
      toast.error(resultAction.error, { id: toastId });
    } else {
      toast.success(`User is now ${targetStatus ? "Active" : "Blocked"}`, { id: toastId });
      router.refresh();
    }
    
    setIsUpdating(false);
  };

  if (userRole === ROLES.ADMIN) {
    return (
      <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-3 py-0.5">
        Active
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <button
        disabled={isUpdating || currentStatus}
        onClick={() => handleToggle(true)}
        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200 ${
          currentStatus
            ? "bg-green-500/15 text-green-400 border-green-500/30 cursor-default"
            : "bg-transparent text-muted-foreground border-border hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20 cursor-pointer"
        } ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}
      >
        Active
      </button>
      <button
        disabled={isUpdating || !currentStatus}
        onClick={() => handleToggle(false)}
        className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200 ${
          !currentStatus
            ? "bg-red-500/15 text-red-400 border-red-500/30 cursor-default"
            : "bg-transparent text-muted-foreground border-border hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 cursor-pointer"
        } ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}
      >
        Block
      </button>
    </div>
  );
}
