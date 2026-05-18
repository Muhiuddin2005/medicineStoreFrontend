import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock3, Package, Truck, XCircle } from "lucide-react";
import { ORDER_STATUSES, type OrderStatus } from "@/types";

type OrderTimelineInput = {
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

type Step = {
  key: OrderStatus;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const LINEAR_STEPS: Step[] = [
  { key: ORDER_STATUSES.PLACED, title: "Placed", description: "Order has been created.", icon: Package },
  { key: ORDER_STATUSES.PROCESSING, title: "Processing", description: "Seller is preparing the order.", icon: Clock3 },
  { key: ORDER_STATUSES.SHIPPED, title: "Shipped", description: "Order is on the way.", icon: Truck },
  { key: ORDER_STATUSES.DELIVERED, title: "Delivered", description: "Order has been delivered.", icon: CheckCircle2 },
];

export function OrderTracker({ status, createdAt, updatedAt }: OrderTimelineInput) {
  const currentIndex = LINEAR_STEPS.findIndex((step) => step.key === status);
  const isCancelled = status === ORDER_STATUSES.CANCELLED;

  const formatDate = (value: string) =>
    new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {isCancelled ? (
            <>
              <li className="relative pl-9">
                <span className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full border bg-background">
                  <Package className="h-4 w-4 text-primary" />
                </span>
                <p className="font-medium">Placed</p>
                <p className="text-sm text-muted-foreground">Order was created.</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(createdAt)}</p>
              </li>
              <li className="relative pl-9">
                <span className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-500 bg-red-500/10">
                  <XCircle className="h-4 w-4 text-red-600" />
                </span>
                <p className="font-medium text-red-600">Cancelled</p>
                <p className="text-sm text-red-500/90">This order has been cancelled.</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(updatedAt)}</p>
              </li>
            </>
          ) : (
            LINEAR_STEPS.map((step, index) => {
              const state =
                index < currentIndex ? "completed" : index === currentIndex ? "current" : "upcoming";
              const Icon = step.icon;
              const dateText =
                step.key === ORDER_STATUSES.PLACED
                  ? formatDate(createdAt)
                  : state === "current"
                    ? formatDate(updatedAt)
                    : state === "completed"
                      ? "Completed"
                      : "Pending";

              return (
                <li key={step.key} className="relative pl-9">
                  {index < LINEAR_STEPS.length - 1 && (
                    <span className="absolute left-[13px] top-7 h-[calc(100%+8px)] w-px bg-border" />
                  )}
                  <span
                    className={`absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                      state === "completed"
                        ? "border-green-500 bg-green-500/10"
                        : state === "current"
                          ? "border-primary bg-primary/10"
                          : "border-muted-foreground/30 bg-background"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        state === "completed"
                          ? "text-green-600"
                          : state === "current"
                            ? "text-primary"
                            : "text-muted-foreground"
                      }`}
                    />
                  </span>
                  <p className={`font-medium ${state === "upcoming" ? "text-muted-foreground" : ""}`}>{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{dateText}</p>
                </li>
              );
            })
          )}
        </ol>
      </CardContent>
    </Card>
  );
}
