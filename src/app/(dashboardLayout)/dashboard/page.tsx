import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Package, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMyOrdersAction } from "../../../../actions/order";
import { ReviewForm } from "@/components/modules/dashboard/ReviewForm";
import { CancelOrderButton } from "@/components/modules/dashboard/CancelOrderButton";
import { getSessionAction } from "../../../../actions/auth";
import { ROLES, type OrderStatus } from "@/types";
import { OrderStepper } from "@/components/modules/dashboard/OrderStepper";

type OrderItem = {
  id: number;
  price: number;
  quantity: number;
  medicine: {
    id: number;
    name: string;
  };
};

type Order = {
  id: number;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  status: string;
  shippingAddress: string;
  placedAt: string;
  processingAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  items: OrderItem[];
};

export default async function DashboardPage() {
  const result = await getMyOrdersAction();
  const orders = result.data || [];
  const session = await getSessionAction();
  const role = session?.role || ROLES.CUSTOMER;
  
  const roleButtons =
    role === ROLES.ADMIN
      ? [
          { href: "/admin/users", label: "Manage Users" },
          { href: "/admin/orders", label: "Platform Orders" },
          { href: "/admin/medicines", label: "Platform Medicines" },
          { href: "/admin/categories", label: "Manage Categories" },
        ]
      : role === ROLES.SELLER
        ? [
            { href: "/seller/inventory", label: "Inventory" },
            { href: "/seller/add-medicine", label: "Add Medicine" },
            { href: "/seller/orders", label: "Seller Orders" },
          ]
        : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED": return "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20";
      case "PROCESSING": return "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20";
      case "SHIPPED": return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20";
      case "DELIVERED": return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
      case "CANCELLED": return "bg-red-500/10 text-red-600 hover:bg-red-500/20";
      default: return "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders and account settings.</p>
        </div>
        <Link href="/shop">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {roleButtons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Go to your role routes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {roleButtons.map((route) => (
                <Link key={route.href} href={route.href}>
                  <Button className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-md hover:opacity-90">
                    {route.label}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order History
            </CardTitle>
            <CardDescription>View the status of your recent purchases.</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
                <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                <Link href="/shop">
                  <Button>Browse Medicines</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order: Order) => (
                  <div key={order.id} className="border rounded-lg p-6 space-y-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID: #{order.id}</p>
                        <p className="font-medium">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <Link href={`/orders/${order.id}`} className="text-sm text-primary hover:underline">
                          Track this order
                        </Link>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">৳{order.totalPrice}</span>
                        <Badge className={getStatusColor(order.status)} variant="outline">
                          {order.status}
                        </Badge>
                        {order.status === "PLACED" && role === ROLES.CUSTOMER && (
                          <CancelOrderButton orderId={order.id} />
                        )}
                      </div>
                    </div>

                    <div className="w-full bg-gradient-to-r from-primary/5 via-blue-500/5 to-transparent rounded-2xl p-6 border border-primary/10">
                      <OrderStepper 
                        status={order.status as OrderStatus} 
                        dates={{
                          placedAt: order.placedAt,
                          processingAt: order.processingAt || undefined,
                          shippedAt: order.shippedAt || undefined,
                          deliveredAt: order.deliveredAt || undefined,
                          cancelledAt: order.cancelledAt || undefined,
                          createdAt: order.createdAt,
                          updatedAt: order.updatedAt,
                        }}
                      />
                    </div>

                    <div className="grid gap-3">
                      {order.items?.map((item: OrderItem) => (
                        <div key={item.id} className="flex flex-col gap-2 border-b last:border-0 pb-3 last:pb-0">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                                <Pill className="h-5 w-5 text-muted-foreground/50" />
                              </div>
                              <div className="flex flex-col">
                                <span>{item.medicine?.name || "Unknown Medicine"}</span>
                                <span className="text-muted-foreground text-xs">Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="font-medium">৳{item.price * item.quantity}</span>
                              {order.status === "DELIVERED" && (
                                <ReviewForm medicineId={item.medicine.id} medicineName={item.medicine.name} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-muted/30 p-3 rounded-md text-sm text-muted-foreground flex items-start gap-2 mt-4">
                      <Truck className="h-4 w-4 mt-0.5 shrink-0" />
                      <p>Delivering to: <span className="text-foreground">{order.shippingAddress}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex h-3 w-3 rounded-full border border-primary bg-background" />
          </span>
          <span className="text-sm font-medium">Role: {role}</span>
        </div>
      </div>
    </div>
  );
}