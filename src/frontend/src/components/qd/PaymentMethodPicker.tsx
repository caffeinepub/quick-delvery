import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Smartphone, Banknote, Check } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
];

interface PaymentMethodPickerProps {
  selectedMethod: string | null;
  onSelectMethod: (id: string) => void;
}

export function PaymentMethodPicker({ selectedMethod, onSelectMethod }: PaymentMethodPickerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{method.label}</span>
                </div>
                {selectedMethod === method.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
