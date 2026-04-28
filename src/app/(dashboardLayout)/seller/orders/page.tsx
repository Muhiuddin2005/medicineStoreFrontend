
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderStatusSelect } from "@/components/modules/dashboard/OrderStatusSelect";
import { Package } from "lucide-react";
import { getSellerOrdersAction } from "../../../../../actions/order";

type Order = {
  id: number;
  createdAt: string;
  shippingAddress: string;
  totalPrice: number;
  status: string;
};

export default async function SellerOrdersPage() {
  const result = await getSellerOrdersAction();
  const orders = result.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">Fulfill your orders and update delivery statuses.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Active Orders
          </CardTitle>
          <CardDescription>All orders containing your listed medicines.</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">No orders to fulfill yet.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer Address</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: Order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-50 truncate" title={order.shippingAddress}>
                        {order.shippingAddress}
                      </TableCell>
                      <TableCell className="font-bold">৳{order.totalPrice}</TableCell>
                      <TableCell>
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}