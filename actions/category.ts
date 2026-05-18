"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getCategoriesAction() {
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (!data.success) return { error: data.message || "Failed to fetch categories", data: [] };

    return { success: true, data: data.data };
  } catch {
    return { error: "Connection to server failed.", data: [] };
  }
}