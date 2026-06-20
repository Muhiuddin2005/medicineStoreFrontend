import { getMyOrdersAction } from "../../../../actions/order";
import { getSessionAction } from "../../../../actions/auth";
import { ROLES } from "@/types";
import { DashboardContent } from "@/components/modules/dashboard/DashboardContent";

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
  const orders = ((result.data || []) as Order[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
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

  return (
    <DashboardContent 
      orders={orders} 
      role={role} 
      roleButtons={roleButtons} 
    />
  );
}