import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  itemCount: number;
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate();

  const statusColors: Record<string, string> = {
    placed: 'bg-blue-500',
    packed: 'bg-yellow-500',
    'out-for-delivery': 'bg-orange-500',
    delivered: 'bg-green-500'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
          </div>
          <Badge className={statusColors[order.status]}>
            {order.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{order.itemCount} items</p>
            <p className="font-bold text-lg">${order.total}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: `/order-tracking/${order.id}` })}
          >
            Track Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
