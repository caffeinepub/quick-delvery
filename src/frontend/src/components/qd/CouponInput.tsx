import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import { toast } from 'sonner';
import { useCouponsStore } from '../../state/coupons';

export function CouponInput() {
  const [coupon, setCoupon] = useState('');
  const { appliedCoupon, applyCoupon, removeCoupon } = useCouponsStore();

  const handleApply = () => {
    if (!coupon.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const result = applyCoupon(coupon);
    if (result.success) {
      toast.success(result.message);
      setCoupon('');
    } else {
      toast.error(result.message);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    setCoupon('');
    toast.info('Coupon removed');
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              disabled={!!appliedCoupon}
              className="pl-10"
            />
          </div>
          {appliedCoupon ? (
            <Button variant="outline" onClick={handleRemove}>
              Remove
            </Button>
          ) : (
            <Button onClick={handleApply}>
              Apply
            </Button>
          )}
        </div>
        {appliedCoupon && (
          <p className="text-sm text-secondary mt-2">
            ✓ {appliedCoupon.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
