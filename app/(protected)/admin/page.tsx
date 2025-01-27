"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data?.error) {
        toast.error("Forbidden");
      }
      if (data?.success) {
        toast.success("Allowed");
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed");
      } else {
        toast.error("Forbidden");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see information here!" />
        </RoleGate>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click</Button>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
