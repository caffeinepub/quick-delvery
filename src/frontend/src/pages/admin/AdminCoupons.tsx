import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Percent, DollarSign } from 'lucide-react';
import { useCouponsStore } from '../../state/coupons';
import { useEffect } from 'react';

export default function AdminCoupons() {
  const { availableCoupons, seedCoupons, isSeeded } = useCouponsStore();

  useEffect(() => {
    if (!isSeeded) {
      seedCoupons();
    }
  }, [isSeeded, seedCoupons]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Coupons</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Available Coupon Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="px-2 py-1 bg-primary/10 text-primary rounded font-mono font-semibold">
                      {coupon.code}
                    </code>
                    <Badge variant={coupon.type === 'percentage' ? 'default' : 'secondary'}>
                      {coupon.type === 'percentage' ? (
                        <><Percent className="w-3 h-3 mr-1" /> {coupon.value}% OFF</>
                      ) : (
                        <><DollarSign className="w-3 h-3 mr-1" /> ${coupon.value} OFF</>
                      )}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{coupon.description}</p>
                  {coupon.minPurchase && coupon.minPurchase > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum purchase: ${coupon.minPurchase}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
