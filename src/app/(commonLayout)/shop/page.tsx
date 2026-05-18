import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { Medicine } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCategoriesAction } from "../../../../actions/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getMedicines(
  search?: string, 
  category?: string,
  manufacturer?: string,
  minPrice?: string,
  maxPrice?: string
): Promise<Medicine[]> {
  try {
    const url = new URL(`${API_URL}/api/medicines`);
    if (search) url.searchParams.append("search", search);
    if (category) url.searchParams.append("category", category);
    if (manufacturer) url.searchParams.append("manufacturer", manufacturer);
    if (minPrice) url.searchParams.append("minPrice", minPrice);
    if (maxPrice) url.searchParams.append("maxPrice", maxPrice);

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
  const manufacturerQuery = typeof params.manufacturer === "string" ? params.manufacturer : undefined;
  const minPriceQuery = typeof params.minPrice === "string" ? params.minPrice : undefined;
  const maxPriceQuery = typeof params.maxPrice === "string" ? params.maxPrice : undefined;
  
  const [medicines, categoriesResult] = await Promise.all([
    getMedicines(searchQuery, categoryQuery, manufacturerQuery, minPriceQuery, maxPriceQuery),
    getCategoriesAction()
  ]);
  
  const categories = categoriesResult.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-20">
          <h2 className="font-bold text-xl mb-4">Filters</h2>
          
          <form method="GET" action="/shop" className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input 
                type="text" 
                id="search" 
                name="search" 
                placeholder="Medicine name..." 
                defaultValue={searchQuery}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                defaultValue={categoryQuery || ""}
                className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">All Categories</option>
                {categories.map((cat: { id: number; name: string }) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input 
                type="text" 
                id="manufacturer" 
                name="manufacturer" 
                placeholder="e.g. Square" 
                defaultValue={manufacturerQuery}
              />
            </div>

            <div className="space-y-2">
              <Label>Price Range (৳)</Label>
              <div className="flex gap-2 items-center">
                <Input 
                  type="number" 
                  name="minPrice" 
                  placeholder="Min" 
                  defaultValue={minPriceQuery}
                  className="w-full"
                />
                <span className="text-muted-foreground">-</span>
                <Input 
                  type="number" 
                  name="maxPrice" 
                  placeholder="Max" 
                  defaultValue={maxPriceQuery}
                  className="w-full"
                />
              </div>
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