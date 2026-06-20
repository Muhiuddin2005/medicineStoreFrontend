import { Medicine, Review } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pill, User, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getMedicineByIdAction } from "../../../../../actions/medicine";
import { AddToCartButton } from "@/components/modules/shop/AddToCartButton";
import Image from "next/image";

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getMedicineByIdAction(id);
  const medicine = result.data as Medicine | null;

  if (!medicine) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div 
          className="relative aspect-square bg-muted rounded-xl flex items-center justify-center border overflow-hidden"
          style={{ position: "relative" }}
        >
          {medicine.imageUrl ? (
            <Image src={medicine.imageUrl} alt={medicine.name} fill className="object-cover" />
          ) : (
            <Pill className="h-32 w-32 text-muted-foreground/40" />
          )}
        </div>

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

          <AddToCartButton medicine={medicine} variant="lg" />
        </div>
      </div>

      <Separator />

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
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{review.customer?.name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(review.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
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