"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAllUsersAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Unauthorized", data: [] };
    const res = await fetch(`${API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      cache: "no-store",
    });

    const data = await res.json();
    
    if (!data.success) return { error: data.message || "Failed to fetch users", data: [] };

    return { success: true, data: data.data };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Connection to server failed.", data: [] };
  }
}

export async function toggleUserStatusAction(userId: string | number, targetStatus: boolean) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ status: targetStatus }),
    });

    const data = await res.json();
    
    if (!data.success) return { error: data.message || "Failed to update status" };

    return { success: true };
  } catch (error) {
    return { error: "Connection to server failed." };
  }
}