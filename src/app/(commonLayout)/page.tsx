import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { Medicine } from "@/types";
import { Badge } from "@/components/ui/badge";
import { WhyChooseUs } from "@/components/modules/home/WhyChooseUs";
import HowItWorks from "@/components/layout/HowItWorks";
import HeroSection from "@/components/layout/HeroSection";
import { RevealFade, RevealZoom } from "@/components/animations/ScrollReveal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getFeaturedMedicines(): Promise<Medicine[]> {
  try {
    const res = await fetch(`${API_URL}/api/medicines?limit=4`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredMedicines = await getFeaturedMedicines();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      <HeroSection />

      <HowItWorks />

      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <RevealFade direction="up" fraction={0.5}>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Medicines</h2>
              <p className="text-muted-foreground mt-2 text-lg">Essential healthcare products for your daily needs.</p>
            </div>
            <Link href="/shop" className="hidden sm:block">
              <Button variant="ghost" className="hover:translate-x-1 transition-transform">
                View All &rarr;
              </Button>
            </Link>
          </div>
        </RevealFade>

        {featuredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <RevealZoom cascade damping={0.1} fraction={0.2}>
              {featuredMedicines.map((medicine) => (
                <div key={medicine.id} className="h-full">
                  <MedicineCard medicine={medicine} />
                </div>
              ))}
            </RevealZoom>
          </div>
        ) : (
          <RevealFade>
            <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
              <p className="text-muted-foreground text-lg">No medicines available at the moment.</p>
            </div>
          </RevealFade>
        )}

        <div className="mt-8 sm:hidden flex justify-center">
          <Link href="/shop" className="w-full">
            <Button variant="outline" className="w-full">View All Medicines</Button>
          </Link>
        </div>
      </section>

      <WhyChooseUs />

    </div>
  );
}