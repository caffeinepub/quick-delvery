import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { PricingSummary } from '../components/qd/PricingSummary';
import { AddressBook } from '../components/qd/AddressBook';
import { PaymentMethodPicker } from '../components/qd/PaymentMethodPicker';
import { useCartStore } from '../state/cart';
import { useServiceAvailability } from '../hooks/qd/useServiceAvailability';
import { useCouponsStore } from '../state/coupons';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { getTotal, clearCart } = useCartStore();
  const { isAvailable } = useServiceAvailability();
  const removeCoupon = useCouponsStore(state => state.removeCoupon);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!isAvailable) {
      toast.error('Service not available in your area');
      navigate({ to: '/out-of-radius' });
      return;
    }

    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = Date.now().toString();
      clearCart();
      removeCoupon();
      toast.success('Order placed successfully!');
      navigate({ to: `/order-success/${orderId}` });
    }, 2000);
  };

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/cart' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <AddressBook
          selectedAddress={selectedAddress}
          onSelectAddress={setSelectedAddress}
        />

        <PaymentMethodPicker
          selectedMethod={selectedPayment}
          onSelectMethod={setSelectedPayment}
        />

        <PricingSummary subtotal={getTotal()} />

        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </main>
    </GradientShell>
  );
}
