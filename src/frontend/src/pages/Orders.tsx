import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { EmptyState } from '../components/qd/EmptyState';
import { OrderCard } from '../components/qd/OrderCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package } from 'lucide-react';

// Mock orders data
const MOCK_ORDERS = [
  {
    id: '1',
    date: '2026-02-13',
    total: 45.99,
    status: 'delivered',
    itemCount: 5
  }
];

export default function Orders() {
  const navigate = useNavigate();

  if (MOCK_ORDERS.length === 0) {
    return (
      <GradientShell>
        <header className="sticky top-0 z-50 glass-card border-b">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/home' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </header>
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Start shopping to see your orders here"
          actionLabel="Start Shopping"
          onAction={() => navigate({ to: '/home' })}
        />
      </GradientShell>
    );
  }

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/home' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Order History</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-4">
        {MOCK_ORDERS.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </main>
    </GradientShell>
  );
}
