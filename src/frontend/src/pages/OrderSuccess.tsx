import { useNavigate, useParams } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams({ strict: false }) as { orderId: string };

  return (
    <GradientShell>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full animate-scale-in">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-secondary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
              <p className="text-muted-foreground">
                Your order #{orderId} has been confirmed
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate({ to: `/order-tracking/${orderId}` })}
                className="w-full"
              >
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/home' })}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </GradientShell>
  );
}
