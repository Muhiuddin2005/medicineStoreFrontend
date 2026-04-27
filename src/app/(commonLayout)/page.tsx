import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { Medicine } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
async function getFeaturedMedicines(): Promise<Medicine[]> {
  try {
    const res = await fetch(`${API_URL}/api/medicines?limit=4`, { 
      cache: "no-store" 
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch medicines:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredMedicines = await getFeaturedMedicines();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Your Health, <span className="text-primary">Delivered.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Order authentic over-the-counter medicines from trusted sellers and get them delivered securely with Cash on Delivery.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/shop">
              <Button size="lg" className="px-8">Shop Now</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">Become a Seller</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Medicines</h2>
            <p className="text-muted-foreground mt-2">Essential healthcare products for your daily needs.</p>
          </div>
          <Link href="/shop">
            <Button variant="ghost">View All &rarr;</Button>
          </Link>
        </div>

        {featuredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/50 rounded-lg border border-dashed">
            <p className="text-muted-foreground">No medicines available at the moment.</p>
          </div>
        )}
      </section>

    </div>
  );
}