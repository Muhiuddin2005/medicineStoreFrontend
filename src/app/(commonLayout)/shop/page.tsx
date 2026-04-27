import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { Medicine } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
async function getMedicines(search?: string, category?: string): Promise<Medicine[]> {
  try {
    const url = new URL(`${API_URL}/api/medicines`);
    if (search) url.searchParams.append("search", search);
    if (category) url.searchParams.append("category", category);

    const res = await fetch(url.toString(), { cache: "no-store" });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch medicines:", error);
    return [];
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const searchQuery = typeof params.search === "string" ? params.search : undefined;
  const categoryQuery = typeof params.category === "string" ? params.category : undefined;
  const medicines = await getMedicines(searchQuery, categoryQuery);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-20">
          <h2 className="font-bold text-xl mb-4">Filters</h2>
          
          <form method="GET" action="/shop" className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  id="search" 
                  name="search" 
                  placeholder="Search medicines..." 
                  defaultValue={searchQuery}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                defaultValue={categoryQuery || ""}
                className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">All Categories</option>
                <option value="Pain Killer">Painkillers</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Vitamins">Vitamins</option>
                <option value="First Aid">First Aid</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full">Apply Filters</Button>
              <Button type="button" variant="outline" asChild className="w-full">
                <a href="/shop">Clear Filters</a>
              </Button>
            </div>
          </form>
        </div>
      </aside>

      {/* Main Product Grid */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Medicines</h1>
          <p className="text-muted-foreground text-sm">
            Showing {medicines.length} results
          </p>
        </div>

        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
            <h3 className="text-lg font-semibold mb-2">No medicines found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

    </div>
  );
}