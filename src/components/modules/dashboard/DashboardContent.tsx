"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Package, Truck, Users, ShoppingBag, Layers, PlusCircle, Database } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "@/components/modules/dashboard/ReviewForm";
import { CancelOrderButton } from "@/components/modules/dashboard/CancelOrderButton";
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

interface DashboardContentProps {
  orders: Order[];
  role: string;
  roleButtons: { href: string; label: string }[];
}

export function DashboardContent({ orders, role, roleButtons }: DashboardContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const quickAccessRef = useRef<HTMLDivElement>(null);
  const orderHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger fade-in animation for dashboard layout cards
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    if (quickAccessRef.current) {
      tl.fromTo(
        quickAccessRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
      
      // Animate quick access buttons
      const buttons = quickAccessRef.current.querySelectorAll(".quick-access-btn");
      if (buttons.length > 0) {
        gsap.fromTo(
          buttons,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
        );
      }
    }

    if (orderHistoryRef.current) {
      tl.fromTo(
        orderHistoryRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      // Animate individual order cards
      const orderCards = orderHistoryRef.current.querySelectorAll(".order-card");
      if (orderCards.length > 0) {
        gsap.fromTo(
          orderCards,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 }
        );
      }
    }
  }, []);

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

  const getRouteIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("user")) return <Users className="h-4.5 w-4.5" />;
    if (l.includes("order")) return <ShoppingBag className="h-4.5 w-4.5" />;
    if (l.includes("medicine")) return <Pill className="h-4.5 w-4.5" />;
    if (l.includes("category") || l.includes("categories")) return <Layers className="h-4.5 w-4.5" />;
    if (l.includes("inventory")) return <Database className="h-4.5 w-4.5" />;
    if (l.includes("add")) return <PlusCircle className="h-4.5 w-4.5" />;
    return <Package className="h-4.5 w-4.5" />;
  };

  const getRouteButtonStyle = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("user")) {
      return "from-violet-600 to-indigo-600 hover:from-indigo-600 hover:to-violet-600 shadow-violet-500/20 hover:shadow-violet-500/30 border-violet-500/30";
    }
    if (l.includes("order")) {
      return "from-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-500 shadow-orange-500/20 hover:shadow-orange-500/30 border-orange-500/30";
    }
    if (l.includes("medicine") || l.includes("inventory")) {
      return "from-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-500 shadow-emerald-500/20 hover:shadow-emerald-500/30 border-emerald-500/30";
    }
    if (l.includes("category") || l.includes("categories")) {
      return "from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-blue-500/20 hover:shadow-blue-500/30 border-blue-500/30";
    }
    if (l.includes("add")) {
      return "from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 shadow-pink-500/20 hover:shadow-pink-500/30 border-pink-500/30";
    }
    return "from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-primary/20 hover:shadow-primary/30 border-primary/30";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div ref={headerRef} className="flex items-center justify-between mb-8 opacity-0">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage your orders and account settings.</p>
        </div>
        <Link href="/shop">
          <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer">
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid gap-8">
        {roleButtons.length > 0 && (
          <div ref={quickAccessRef} className="opacity-0">
            <Card className="border border-border/40 bg-card/60 backdrop-blur-md shadow-md rounded-3xl overflow-hidden">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-xl font-bold tracking-tight">Quick Access</CardTitle>
                <CardDescription>Go to your role routes.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 pt-6">
                {roleButtons.map((route) => (
                  <Link key={route.href} href={route.href}>
                    <Button className={`quick-access-btn opacity-0 rounded-full font-extrabold px-7 py-6 bg-gradient-to-r ${getRouteButtonStyle(route.label)} text-white border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer relative overflow-hidden group`}>
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                      {getRouteIcon(route.label)}
                      {route.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={orderHistoryRef} className="opacity-0">
          <Card className="border border-border/40 bg-card/60 backdrop-blur-md shadow-md rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <Package className="h-5 w-5 text-primary" />
                Order History
              </CardTitle>
              <CardDescription>View the status of your recent purchases.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-border/60">
                  <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link href="/shop">
                    <Button className="rounded-full px-6 font-semibold">Browse Medicines</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order: Order) => (
                    <div key={order.id} className="order-card opacity-0 border border-border/40 bg-background/40 hover:bg-background/80 hover:border-primary/25 transition-all duration-300 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                        <div>
                          <p className="text-sm text-muted-foreground font-semibold">Order ID: #{order.id}</p>
                          <p className="font-medium text-sm mt-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                          <Link href={`/orders/${order.id}`} className="text-sm text-primary hover:underline font-semibold inline-block mt-1">
                            Track this order &rarr;
                          </Link>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-extrabold text-xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                            ৳{order.totalPrice}
                          </span>
                          <Badge className={`${getStatusColor(order.status)} rounded-full font-bold px-3 py-1`} variant="outline">
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

                      <div className="grid gap-3 pt-2">
                        {order.items?.map((item: OrderItem) => (
                          <div key={item.id} className="flex flex-col gap-2 border-b last:border-0 border-border/30 pb-3 last:pb-0">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-muted/50 rounded-xl flex items-center justify-center border">
                                  <Pill className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold">{item.medicine?.name || "Unknown Medicine"}</span>
                                  <span className="text-muted-foreground text-xs">Qty: {item.quantity}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="font-bold text-foreground">৳{item.price * item.quantity}</span>
                                {order.status === "DELIVERED" && (
                                  <ReviewForm medicineId={item.medicine.id} medicineName={item.medicine.name} />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted/20 p-3.5 rounded-xl text-sm text-muted-foreground flex items-start gap-2.5 mt-4 border">
                        <Truck className="h-4.5 w-4.5 mt-0.5 shrink-0 text-primary" />
                        <p className="font-medium text-xs sm:text-sm">Delivering to: <span className="text-foreground font-semibold">{order.shippingAddress}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border bg-card/45 backdrop-blur-md px-5 py-2.5 shadow-sm">
          <span className="relative flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border border-primary bg-background" />
          </span>
          <span className="text-sm font-bold tracking-wide">Role: {role}</span>
        </div>
      </div>
    </div>
  );
}
