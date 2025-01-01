import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "@/components/users-table";
import Link from "next/link";

type AdminPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
function AdminPage({ searchParams }: AdminPageProps) {
  const type = searchParams?.type || "users";
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and moderate ideas.
        </p>
      </div>
      <Tabs defaultValue={type as string} className="w-full h-full">
        <TabsList>
          <TabsTrigger value="users">
            <Link href="/admin?type=users">Users</Link>
          </TabsTrigger>
          <TabsTrigger value="ideas">
            <Link href="/admin?type=ideas">Ideas</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="h-full">
          <UsersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminPage;
