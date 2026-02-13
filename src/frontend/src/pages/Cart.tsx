import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { EmptyState } from '../components/qd/EmptyState';
import { CartItem } from '../components/qd/CartItem';
import { CouponInput } from '../components/qd/CouponInput';
import { PricingSummary } from '../components/qd/PricingSummary';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../state/cart';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { items, getTotal } = useCartStore();

  const isEmpty = items.length === 0;

  if (isEmpty) {
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
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some products to get started"
          actionLabel="Browse Products"
          onAction={() => navigate({ to: '/catalog' })}
          imageSrc="/assets/generated/qd-empty-cart.dim_1200x900.png"
        />
      </GradientShell>
    );
  }

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/home' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Shopping Cart</h1>
          </div>
          <span className="text-sm text-muted-foreground">{items.length} items</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>

          <div className="space-y-4">
            <CouponInput />
            <PricingSummary subtotal={getTotal()} />
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={() => navigate({ to: '/checkout' })}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </main>
    </GradientShell>
  );
}
