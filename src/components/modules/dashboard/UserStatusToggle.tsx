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

  return (
    <div className="w-fit ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isUpdating || userRole === ROLES.ADMIN}>
          <Badge 
            variant="outline" 
            className={`cursor-pointer transition-colors flex items-center gap-1 select-none pr-1.5 ${
              currentStatus 
                ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" 
                : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
            } ${isUpdating ? "opacity-50 pointer-events-none" : ""} ${
              userRole === ROLES.ADMIN ? "cursor-default hover:bg-transparent" : ""
            }`}
          >
            {currentStatus ? "Active" : "Blocked"}
            {userRole !== ROLES.ADMIN && <ChevronDown className="h-3 w-3 opacity-60" />}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {currentStatus ? (
            <DropdownMenuItem 
              onClick={() => handleToggle(false)} 
              className="text-red-600 focus:text-red-600 focus:bg-red-500/10 cursor-pointer"
            >
              <ShieldAlert className="mr-2 h-4 w-4" />
              Block User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem 
              onClick={() => handleToggle(true)} 
              className="text-green-600 focus:text-green-600 focus:bg-green-500/10 cursor-pointer"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Activate User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
