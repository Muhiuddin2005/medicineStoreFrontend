"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { createReviewAction } from "../../../../actions/review";

export function ReviewForm({ medicineId, medicineName }: { medicineId: number; medicineName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your review...");

    const result = await createReviewAction({ medicineId, rating, comment });

    if (result.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success("Review submitted successfully!", { id: toastId });
      setIsOpen(false);
      setComment("");
    }
    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Write Review
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 p-4 border rounded-md space-y-3 bg-muted/10 w-full animate-in fade-in slide-in-from-top-2">
      <h4 className="text-sm font-semibold">Reviewing: {medicineName}</h4>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 cursor-pointer transition-colors ${
                star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground hover:text-yellow-500"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <Textarea
        placeholder="Share your experience with this medicine (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-sm resize-none"
        rows={2}
      />
      
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
