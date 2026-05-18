import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminDataAction } from "../../../../../actions/admin";

interface Medicine {
  id: number;
  name: string;
  sellerId: number;
  stock: number;
  price: number;
}

export default async function AdminMedicinesPage() {
  const result = await getAdminDataAction("medicines");
  const medicines = (result.data || []) as Medicine[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Platform Inventory</h1>
      <Card>
        <CardHeader><CardTitle>All Medicines</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Seller ID</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map((med: Medicine) => (
                <TableRow key={med.id}>
                  <TableCell>#{med.id}</TableCell>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>Seller #{med.sellerId}</TableCell>
                  <TableCell>{med.stock}</TableCell>
                  <TableCell className="text-right font-bold">৳{med.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
