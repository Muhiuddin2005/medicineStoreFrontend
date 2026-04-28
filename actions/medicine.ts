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

export async function createMedicineAction(payload: CreateMedicinePayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { error: "You must be logged in as a Seller to add medicines." };
    }

    const res = await fetch(`${API_URL}/api/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
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