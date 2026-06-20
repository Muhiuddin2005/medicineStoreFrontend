import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAdminDataAction } from "../../../../../actions/admin";
import { OrderTrackSheet } from "@/components/modules/dashboard/OrderTrackSheet";

interface Order {
  id: number;
  customerId: number;
  customer?: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  status: string;
  totalPrice: number;
  placedAt: string;
  processingAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  shippingAddress: string;
}

export default async function AdminOrdersPage() {
  const result = await getAdminDataAction("orders");
  const orders = ((result.data || []) as Order[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Platform Orders</h1>
      <Card>
        <CardHeader><CardTitle>All Orders</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customer?.name || `User #${order.customerId}`}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell><Badge variant="outline">{order.status}</Badge></TableCell>
                  <TableCell>
                    <OrderTrackSheet order={order} />
                  </TableCell>
                  <TableCell className="text-right font-bold">৳{order.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
