"use server";

import { cookies } from "next/headers";

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

    return { success: true, data: data.data };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Connection to server failed.", data: [] };
  }
}

export async function updateOrderStatusAction(orderId: number, status: string) {
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