"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { OrderStepper } from "./OrderStepper";
import { type OrderStatus } from "@/types";
import { Activity, MapPin, User, Calendar, CircleDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OrderTrackSheetProps {
  order: {
    id: number;
    status: string;
    totalPrice: number;
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
    placedAt: string;
    processingAt: string | null;
    shippedAt: string | null;
    deliveredAt: string | null;
    cancelledAt: string | null;
    customer?: {
      name: string;
    };
  };
}

export function OrderTrackSheet({ order }: OrderTrackSheetProps) {
  const status = order.status as OrderStatus;
  const dates = {
    placedAt: order.placedAt,
    processingAt: order.processingAt || undefined,
    shippedAt: order.shippedAt || undefined,
    deliveredAt: order.deliveredAt || undefined,
    cancelledAt: order.cancelledAt || undefined,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 text-primary shadow-sm hover:shadow-md transition-all cursor-pointer">
          <Activity className="w-4 h-4" /> Timeline
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px] bg-background/95 backdrop-blur-xl border-l border-border/40 overflow-y-auto">
        <SheetHeader className="mb-6 border-b pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Order #{order.id}
            </SheetTitle>
            <Badge variant="outline" className="capitalize font-bold text-sm bg-primary/5 text-primary border-primary/20 px-3 py-1">
              {order.status.toLowerCase()}
            </Badge>
          </div>
          <SheetDescription className="text-sm text-muted-foreground mt-1">
            Fulfillment timeline and order metadata.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl border border-primary/10 shadow-inner">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-4">
              Status Timeline
            </h4>
            <OrderStepper status={status} dates={dates} />
          </div>

          <div className="p-6 bg-card rounded-2xl border border-border/60 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Order Details
            </h4>
            
            <div className="grid gap-4">
              {order.customer?.name && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-muted text-muted-foreground">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Customer</span>
                    <span className="text-sm font-semibold text-foreground">{order.customer.name}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded-lg bg-muted text-muted-foreground">
                  <CircleDollarSign className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Total Bill</span>
                  <span className="text-sm font-black text-foreground">৳{order.totalPrice}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded-lg bg-muted text-muted-foreground">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Order Created</span>
                  <span className="text-sm font-medium text-foreground">
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded-lg bg-muted text-muted-foreground">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Shipping Address</span>
                  <span className="text-sm font-medium text-foreground leading-relaxed">
                    {order.shippingAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
