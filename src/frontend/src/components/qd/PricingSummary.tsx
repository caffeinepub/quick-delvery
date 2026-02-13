import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCouponsStore } from '../../state/coupons';

interface PricingSummaryProps {
  subtotal: number;
  deliveryCharge?: number;
}

export function PricingSummary({ 
  subtotal, 
  deliveryCharge = 5
}: PricingSummaryProps) {
  const { calculateDiscount, appliedCoupon } = useCouponsStore();
  
  const discount = calculateDiscount(subtotal);
  const calculatedTax = subtotal * 0.1; // 10% tax
  const total = subtotal - discount + deliveryCharge + calculatedTax;

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg mb-3">Price Summary</h3>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Discount {appliedCoupon && `(${appliedCoupon.code})`}
            </span>
            <span className="font-medium text-secondary">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Charge</span>
          <span className="font-medium">${deliveryCharge.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span className="font-medium">${calculatedTax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
