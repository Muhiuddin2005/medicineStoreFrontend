"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const getAdminAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? { Authorization: token, "Content-Type": "application/json" } : null;
};

export async function getAdminDataAction(endpoint: "orders" | "medicines" | "categories") {
  try {
    const headers = await getAdminAuthHeader();
    if (!headers) return { error: "Unauthorized", data: [] };

    const res = await fetch(`${API_URL}/api/admin/${endpoint}`, { headers, cache: "no-store" });
    const data = await res.json();
    if (!data.success) return { error: data.message, data: [] };
    return { success: true, data: data.data };
  } catch {
    return { error: "Connection failed.", data: [] };
  }
}

export async function createCategoryAction(name: string) {
  try {
    const headers = await getAdminAuthHeader();
    if (!headers) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/admin/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!data.success) return { error: data.message };
    
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { error: "Connection failed." };
  }
}

export async function deleteCategoryAction(id: number) {
  try {
    const headers = await getAdminAuthHeader();
    if (!headers) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (!data.success) return { error: data.message };
    
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { error: "Connection failed." };
  }
}

export async function updateCategoryAction(id: number, name: string) {
  try {
    const headers = await getAdminAuthHeader();
    if (!headers) return { error: "Unauthorized" };

    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!data.success) return { error: data.message };
    return { success: true };
  } catch {
    return { error: "Connection failed." };
  }
}
