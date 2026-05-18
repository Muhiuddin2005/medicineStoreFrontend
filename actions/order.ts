"use server";

import { cookies } from "next/headers";
import { type OrderStatus } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function createOrderAction(payload: {
  shippingAddress: string;
  items: { medicineId: number; quantity: number; price: number }[];
  totalPrice: number;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { error: "You must be logged in to place an order." };
    }

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      return { error: data.message || "Failed to place order." };
    }

    return { success: true };
  } catch{
    return { error: "Connection to server failed." };
  }
}



export async function getMyOrdersAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { error: "Unauthorized", data: [] };
    }

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) {
      return { error: data.message || "Failed to fetch orders", data: [] };
    }

    return { success: true, data: data.data };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Connection to server failed.", data: [] };
  }
}

export async function getSellerOrdersAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Unauthorized", data: [] };

    const res = await fetch(`${API_URL}/api/seller/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!data.success) return { error: data.message || "Failed to fetch orders", data: [] };

    type SellerOrderItem = {
      order: {
        id: number;
        createdAt: string;
        updatedAt: string;
        shippingAddress: string;
        totalPrice: number;
        status: OrderStatus;
      };
    };

    const normalizedOrders = Array.from(
      new Map(
        (data.data as SellerOrderItem[]).map((item) => [
          item.order.id,
          {
            id: item.order.id,
            createdAt: item.order.createdAt,
            updatedAt: item.order.updatedAt,
            shippingAddress: item.order.shippingAddress,
            totalPrice: item.order.totalPrice,
            status: item.order.status,
          },
        ])
      ).values()
    );

    return { success: true, data: normalizedOrders };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Connection to server failed.", data: [] };
  }
}

export async function updateOrderStatusAction(orderId: number, status: OrderStatus) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/seller/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (!data.success) return { error: data.message || "Failed to update status" };

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Connection to server failed." };
  }
}

export async function getOrderTimeline(orderId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Unauthorized", data: null };

    const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!data.success) return { error: data.message || "Failed to fetch order", data: null };

    return { success: true, data: data.data };
  } catch {
    return { error: "Connection to server failed.", data: null };
  }
}

export async function cancelOrderAction(orderId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });

    const data = await res.json();
    if (!data.success) return { error: data.message || "Failed to cancel order" };

    return { success: true };
  } catch (error) {
    return { error: "Connection to server failed." };
  }
}