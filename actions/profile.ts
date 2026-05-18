"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function updateProfileAction(payload: { name?: string; password?: string }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return { error: "Unauthorized" };

    const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v !== ""));
    if (Object.keys(cleanPayload).length === 0) return { error: "Nothing to update." };

    const res = await fetch(`${API_URL}/api/auth/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(cleanPayload),
    });

    const data = await res.json();
    if (!data.success) return { error: data.message || "Failed to update profile." };
    return { success: true };
  } catch {
    return { error: "Connection failed." };
  }
}
