"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PackageSearch, Trash2, Edit } from "lucide-react";
import { getSellerInventoryAction, deleteMedicineAction, updateMedicineAction } from "../../../../../actions/medicine";
import { Medicine } from "@/types";

export default function SellerInventoryPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  const fetchInventory = async () => {
    setIsLoading(true);
    const result = await getSellerInventoryAction();
    if (result.success) setMedicines(result.data);
    else toast.error(result.error);
    setIsLoading(false);
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;
    const toastId = toast.loading("Deleting medicine...");
    const result = await deleteMedicineAction(id);
    if (result.success) {
      toast.success("Medicine deleted successfully", { id: toastId });
      fetchInventory(); 
    } else {
      toast.error(result.error, { id: toastId });
    }
  };

  const handleEditSubmit = async () => {
    if (!editingMedicine) return;
    const toastId = toast.loading("Updating medicine...");
    const result = await updateMedicineAction(editingMedicine.id, { price: editPrice, stock: editStock });
    
    if (result.success) {
      toast.success("Updated successfully!", { id: toastId });
      setEditingMedicine(null);
      fetchInventory();
    } else {
      toast.error(result.error, { id: toastId });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">View and manage your listed medicines.</p>
      </div>

      <Card className="shadow-sm border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageSearch className="h-5 w-5 text-primary" />
            My Medicines
          </CardTitle>
          <CardDescription>Update stock, change prices, or remove items.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
               <div className="h-10 bg-muted rounded w-full"></div>
               <div className="h-10 bg-muted rounded w-full"></div>
            </div>
          ) : medicines.length === 0 ? (
            <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">You haven&apos;t listed any medicines yet.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicines.map((medicine) => (
                    <TableRow key={medicine.id} className="group transition-colors">
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell><Badge variant="outline">{medicine.category?.name}</Badge></TableCell>
                      <TableCell className="font-bold text-primary">৳{medicine.price}</TableCell>
                      <TableCell>
                        <Badge variant={medicine.stock > 10 ? "secondary" : "destructive"}>
                          {medicine.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            setEditingMedicine(medicine);
                            setEditPrice(medicine.price);
                            setEditStock(medicine.stock);
                          }}
                          className="hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(medicine.id)} className="hover:bg-red-50">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!editingMedicine} onOpenChange={(open) => !open && setEditingMedicine(null)}>
        <SheetContent side="right" className="w-[400px] sm:w-[500px] p-8 bg-background/95 backdrop-blur-xl border-l border-border/40 shadow-2xl">
          <SheetHeader className="mb-8 border-b pb-6">
            <SheetTitle className="text-2xl font-extrabold tracking-tight">Edit Medicine</SheetTitle>
            <SheetDescription className="text-base text-muted-foreground mt-1">
              Updating details for <span className="font-bold text-primary">{editingMedicine?.name}</span>
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-4 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold tracking-wide uppercase text-muted-foreground">Price (৳)</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold group-focus-within:text-primary transition-colors">৳</span>
                <Input 
                  type="number" 
                  className="pl-9 h-14 text-lg font-medium rounded-xl border-primary/20 focus-visible:ring-primary/40 shadow-sm transition-all"
                  value={editPrice || ""} 
                  onChange={(e) => setEditPrice(Number(e.target.value))} 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold tracking-wide uppercase text-muted-foreground">Stock Quantity</label>
              <Input 
                type="number" 
                className="h-14 px-4 text-lg font-medium rounded-xl border-primary/20 focus-visible:ring-primary/40 shadow-sm transition-all"
                value={editStock || ""} 
                onChange={(e) => setEditStock(Number(e.target.value))} 
              />
            </div>
            
            <div className="pt-4">
              <Button onClick={handleEditSubmit} className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300 transform active:scale-[0.98]">
                Save Changes
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
