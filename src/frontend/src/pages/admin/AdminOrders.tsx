import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Order Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Order management will be available once backend support is added.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
