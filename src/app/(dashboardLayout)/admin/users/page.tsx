
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users} from "lucide-react";
import { getAllUsersAction } from "../../../../../actions/user";
import { UserStatusToggle } from "@/components/modules/dashboard/UserStatusToggle";
import { ROLES, type Role } from "@/types";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: boolean;
  createdAt: string;
}

export default async function AdminUsersPage() {
  const result = await getAllUsersAction();
  const users = (result.data || []) as User[];

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case ROLES.ADMIN: return <Badge variant="destructive">Admin</Badge>;
      case ROLES.SELLER: return <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20" variant="outline">Seller</Badge>;
      default: return <Badge variant="secondary">Customer</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">View and manage all registered accounts across MediStore.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registered Users
          </CardTitle>
          <CardDescription>A complete list of customers, sellers, and administrators.</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">No users found. Are you sure you are an Admin?</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">#{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {user.createdAt ? (
                          new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <UserStatusToggle 
                          userId={user.id} 
                          currentStatus={user.status} 
                          userRole={user.role} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}