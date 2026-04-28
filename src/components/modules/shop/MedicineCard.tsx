import Image from "next/image";
import { Pill } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Medicine } from "@/types";
import { AddToCartButton } from "./AddToCartButton";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full bg-muted flex items-center justify-center">
        {medicine.imageUrl ? (
          <Image 
            src={medicine.imageUrl} 
            alt={medicine.name} 
            fill 
            className="object-cover" 
          />
        ) : (
          <Pill className="h-12 w-12 text-muted-foreground opacity-50" />
        )}
      </div>

      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1" title={medicine.name}>
            {medicine.name}
          </h3>
          <Badge variant="secondary">{medicine.category.name}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {medicine.description}
        </p>
        <div className="text-sm text-muted-foreground mb-2">
          By: {medicine.manufacturer}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <span className="text-lg font-bold text-primary">৳{medicine.price}</span>
        <AddToCartButton medicine={medicine} />
      </CardFooter>
    </Card>
  );
}