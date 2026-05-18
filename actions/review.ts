"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function createReviewAction(payload: { medicineId: number; rating: number; comment?: string }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { error: "You must be logged in to leave a review." };
    }

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      return { error: data.message || "Failed to submit review." };
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { error: "Connection to server failed." };
  }
}
