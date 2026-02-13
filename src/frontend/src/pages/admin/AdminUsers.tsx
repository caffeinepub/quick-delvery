import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            User management features including role assignment will be available once backend support is added.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
