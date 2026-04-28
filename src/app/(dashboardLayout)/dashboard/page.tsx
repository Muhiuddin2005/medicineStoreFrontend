
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Package, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMyOrdersAction } from "../../../../actions/order";

type OrderItem = {
  id: number;
  price: number;
  quantity: number;
  medicine: {
    name: string;
  };
};

type Order = {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  shippingAddress: string;
  orderItems: OrderItem[];
};

export default async function DashboardPage() {
  const result = await getMyOrdersAction();
  const orders = result.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20";
      case "SHIPPED": return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20";
      case "DELIVERED": return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
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
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID: #{order.id}</p>
                        <p className="font-medium">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">৳{order.totalPrice}</span>
                        <Badge className={getStatusColor(order.status)} variant="outline">
                          {order.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid gap-3">
                      {order.orderItems?.map((item: OrderItem) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                              <Pill className="h-5 w-5 text-muted-foreground/50" />
                            </div>
                            <span>
                              {item.medicine.name} <span className="text-muted-foreground">x {item.quantity}</span>
                            </span>
                          </div>
                          <span className="font-medium">৳{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address */}
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
    </div>
  );
}