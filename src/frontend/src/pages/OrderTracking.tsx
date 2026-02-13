import { useNavigate, useParams } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { OrderTimeline } from '../components/qd/OrderTimeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';

export default function OrderTracking() {
  const navigate = useNavigate();
  const { orderId } = useParams({ strict: false }) as { orderId: string };

  // Mock current status (in real app, fetch from backend)
  const currentStatus = 'packed';

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/orders' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">Track Order</h1>
              <p className="text-xs text-muted-foreground">Order #{orderId}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Estimated Delivery: 15-20 minutes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTimeline currentStatus={currentStatus} />
          </CardContent>
        </Card>
      </main>
    </GradientShell>
  );
}
