"use client";

import { Check, Package, Clock3, Truck, CheckCircle2, XCircle } from "lucide-react";
import { ORDER_STATUSES, type OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const steps = [
  { id: ORDER_STATUSES.PLACED, label: "Placed", icon: Package, dateKey: "placedAt" as const },
  { id: ORDER_STATUSES.PROCESSING, label: "Processing", icon: Clock3, dateKey: "processingAt" as const },
  { id: ORDER_STATUSES.SHIPPED, label: "Shipped", icon: Truck, dateKey: "shippedAt" as const },
  { id: ORDER_STATUSES.DELIVERED, label: "Delivered", icon: CheckCircle2, dateKey: "deliveredAt" as const },
];

const formatDate = (dateVal?: string | Date) => {
  if (!dateVal) return null;
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export function OrderStepper({ 
  status, 
  dates 
}: { 
  status: OrderStatus;
  dates?: {
    placedAt?: string | Date;
    processingAt?: string | Date;
    shippedAt?: string | Date;
    deliveredAt?: string | Date;
    cancelledAt?: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
}) {
  const isCancelled = status === ORDER_STATUSES.CANCELLED;
  
  let currentIndex = steps.findIndex((s) => s.id === status);
  if (currentIndex === -1) currentIndex = 0; 

  return (
    <div className="w-full py-2">
      <div className="relative flex justify-between w-full">
        
        <div className="absolute left-[12.5%] right-[12.5%] top-5 -translate-y-1/2 h-1.5 bg-muted rounded-full z-0 overflow-hidden shadow-inner">
            {!isCancelled && (
              <div 
                className="h-full bg-primary transition-all duration-700 ease-in-out"
                style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }} 
              />
            )}
        </div>

        {steps.map((step, idx) => {
          const isCompleted = !isCancelled && idx < currentIndex;
          const isActive = !isCancelled && idx === currentIndex;
          const Icon = step.icon;

          let stepDate: string | Date | undefined = undefined;
          if (isCancelled && idx === 0) {
            stepDate = dates?.cancelledAt || dates?.updatedAt;
          } else {
            const key = step.dateKey;
            stepDate = dates?.[key];

            if (!stepDate && (isCompleted || isActive)) {
              if (step.id === ORDER_STATUSES.PLACED) {
                stepDate = dates?.placedAt || dates?.createdAt;
              } else if (step.id === ORDER_STATUSES.DELIVERED) {
                stepDate = dates?.deliveredAt || dates?.updatedAt;
              } else if (step.id === ORDER_STATUSES.PROCESSING) {
                stepDate = dates?.processingAt || dates?.createdAt;
              } else if (step.id === ORDER_STATUSES.SHIPPED) {
                stepDate = dates?.shippedAt || dates?.updatedAt || dates?.createdAt;
              }
            }
          }
          const formattedDate = formatDate(stepDate);

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 w-1/4 group">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-background shadow-sm",
                  isCompleted ? "border-green-500 bg-green-50 text-green-600" : 
                  isActive ? "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110" : 
                  "border-muted bg-muted/20 text-muted-foreground opacity-50"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5 animate-in zoom-in" /> : 
                 isCancelled && idx === 0 ? <XCircle className="w-5 h-5" /> : 
                 <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />}
              </div>
              
              <div className="flex flex-col items-center">
                <span className={cn(
                  "text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300",
                  isActive ? "text-primary" : 
                  isCompleted ? "text-green-600" : 
                  "text-muted-foreground opacity-50"
                )}>
                  {isCancelled && idx === 0 ? "Cancelled" : step.label}
                </span>
                
                {formattedDate ? (
                  <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">
                    {formattedDate}
                  </span>
                ) : isActive && (
                  <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest animate-pulse mt-0.5">
                    Current
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
