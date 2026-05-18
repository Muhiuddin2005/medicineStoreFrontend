"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { deleteAlertOptions } from "@/lib/alerts";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "../../../../../actions/admin";
import { getCategoriesAction } from "../../../../../actions/category";

interface Category { id: number; name: string; }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const loadCategories = async () => {
    const result = await getCategoriesAction();
    if (result.success) setCategories(result.data as Category[]);
    else toast.error(result.error);
  };

  useEffect(() => { loadCategories(); }, []);

  const handleCreate = async () => {
    if (!newCatName) return;
    setLoading(true);
    const result = await createCategoryAction(newCatName);
    if (result.success) {
      toast.success("Category created!");
      setNewCatName("");
      loadCategories();
    } else toast.error(result.error);
    setLoading(false);
  };

  const handleUpdate = async (id: number) => {
    if (!editName) return;
    const result = await updateCategoryAction(id, editName);
    if (result.success) {
      toast.success("Category updated!");
      setEditingId(null);
      loadCategories();
    } else toast.error(result.error);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire(
      deleteAlertOptions(
        "Delete Category?",
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    );

    if (!result.isConfirmed) return;

    const resAction = await deleteCategoryAction(id);
    if (resAction.success) {
      toast.success("Category deleted!");
      loadCategories();
    } else {
      toast.error(resAction.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
      
      <Card className="border-primary/20 shadow-sm">
        <CardHeader><CardTitle>Add New Category</CardTitle></CardHeader>
        <CardContent className="flex gap-4">
          <Input placeholder="e.g. Syrups" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
          <Button onClick={handleCreate} disabled={loading} className="shadow-md">Create</Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id} className="group transition-colors">
                  <TableCell>#{cat.id}</TableCell>
                  <TableCell>
                    {editingId === cat.id ? (
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-8 w-48" />
                    ) : (
                      <span className="font-medium">{cat.name}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId === cat.id ? (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleUpdate(cat.id)}><Check className="h-4 w-4 text-green-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingId(null)}><X className="h-4 w-4 text-gray-500" /></Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}><Edit2 className="h-4 w-4 text-blue-500" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
