import { Medicine, Review } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pill, ShoppingCart, User, Star } from "lucide-react";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getMedicine(id: string): Promise<Medicine | null> {
  try {
    const res = await fetch(`${API_URL}/api/medicines/${id}`, { 
      cache: "no-store" 
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data; 
  } catch {
    return null;
  }
}

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const medicine = await getMedicine(id);

  if (!medicine) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image Placeholder */}
        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center border">
          <Pill className="h-32 w-32 text-muted-foreground/40" />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="outline" className="text-primary border-primary">
              {medicine.category.name}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">{medicine.name}</h1>
            <p className="text-muted-foreground">Manufacturer: {medicine.manufacturer}</p>
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {medicine.description}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">৳{medicine.price}</span>
            <Badge variant={medicine.stock > 0 ? "secondary" : "destructive"}>
              {medicine.stock > 0 ? `${medicine.stock} in stock` : "Out of stock"}
            </Badge>
          </div>

          <Button size="lg" className="w-full md:w-auto gap-2" disabled={medicine.stock === 0}>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      <Separator />

      {/* Reviews Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {medicine.reviews && medicine.reviews.length > 0 ? (
          <div className="grid gap-4">
            {medicine.reviews.map((review: Review) => (
              <Card key={review.id}>
                <CardContent className="pt-6 flex gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{review.customer?.name || "Anonymous"}</p>
                      <div className="flex text-yellow-500 items-center gap-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic text-sm">
                      &quot;{review.comment || "No comment provided."}&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10 bg-muted/20 rounded-lg border border-dashed">
            No reviews yet for this medicine.
          </p>
        )}
      </section>
    </div>
  );
}