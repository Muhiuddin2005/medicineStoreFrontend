"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type CreateMedicinePayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  manufacturer: string;
};

export async function createMedicineAction(payload: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { error: "You must be logged in as a Seller to add medicines." };
    }

    const res = await fetch(`${API_URL}/api/seller/medicines`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: payload,
    });

    const data = await res.json();

    if (!data.success) {
      return { error: data.message || "Failed to add medicine." };
    }

    return { success: true, data: data.data };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Connection to server failed." };
  }
}

export async function getSellerInventoryAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return { error: "Unauthorized", data: [] };

    const res = await fetch(`${API_URL}/api/seller/medicines`, {
      method: "GET",
      headers: { Authorization: token },
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.success) return { error: data.message, data: [] };
    return { success: true, data: data.data };
  } catch {
    return { error: "Connection failed.", data: [] };
  }
}

export async function deleteMedicineAction(medicineId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/seller/medicines/${medicineId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (!data.success) return { error: data.message };
    return { success: true };
  } catch {
    return { error: "Connection failed." };
  }
}

export async function updateMedicineAction(id: number, payload: Partial<CreateMedicinePayload>) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/seller/medicines/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) return { error: data.message };
    return { success: true };
  } catch {
    return { error: "Connection failed." };
  }
}

export async function getMedicineByIdAction(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/medicines/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();

    if (!data.success) return { error: data.message || "Medicine not found.", data: null };
    return { success: true, data: data.data };
  } catch {
    return { error: "Connection failed.", data: null };
  }
}
