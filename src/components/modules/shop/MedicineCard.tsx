"use client";

import Image from "next/image";
import { Pill } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Medicine } from "@/types";
import { AddToCartButton } from "./AddToCartButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative group h-full cursor-pointer w-full rounded-[28px] overflow-hidden p-[4px]"
      onClick={() => router.push(`/shop/${medicine.id}`)}
    >
      <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#2563eb_50%,#00000000_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#2563eb_30%,#4f46e5_70%,#00000000_100%)] transition-all duration-500 opacity-80 group-hover:opacity-100" />
      
      <div className="relative flex flex-col h-full w-full bg-card rounded-[24px] overflow-hidden shadow-sm z-10 transition-colors group-hover:bg-card/95 backdrop-blur-xl">
        
        <div className="relative h-48 w-full bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border/50">
          {medicine.imageUrl ? (
            <Image 
              src={medicine.imageUrl} 
              alt={medicine.name} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <motion.div 
              className="absolute text-muted-foreground/30"
              whileHover={{ rotate: 15, scale: 1.2 }}
            >
              <Pill className="h-16 w-16" />
            </motion.div>
          )}

          <div className="absolute top-3 left-3 z-20">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md shadow-xs border-border/50">
              {medicine.category.name}
            </Badge>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300" title={medicine.name}>
              {medicine.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {medicine.description}
          </p>
          <div className="text-xs font-medium text-muted-foreground/70 mb-2 uppercase tracking-wider">
            By {medicine.manufacturer}
          </div>
        </div>

        <div className="p-5 pt-0 flex items-center justify-between mt-auto bg-gradient-to-t from-muted/10 to-transparent">
          <span className="text-2xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ৳{medicine.price}
          </span>
          <AddToCartButton medicine={medicine} variant="sm" />
        </div>
      </div>
    </motion.div>
  );
}