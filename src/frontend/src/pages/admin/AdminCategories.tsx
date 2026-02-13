import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree } from 'lucide-react';

export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Categories</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="w-5 h-5" />
            Category Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Category management will be available once backend support is added.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
