import { Check, Package, Box, Truck, Home } from 'lucide-react';

const STATUSES = [
  { id: 'placed', label: 'Order Placed', icon: Package },
  { id: 'packed', label: 'Packed', icon: Box },
  { id: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Home }
];

interface OrderTimelineProps {
  currentStatus: string;
}

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const currentIndex = STATUSES.findIndex(s => s.id === currentStatus);

  return (
    <div className="space-y-6">
      {STATUSES.map((status, index) => {
        const Icon = status.icon;
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={status.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted && index < currentIndex ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              {index < STATUSES.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
            <div className="flex-1 pb-8">
              <h3
                className={`font-semibold mb-1 ${
                  isCurrent ? 'text-primary' : ''
                }`}
              >
                {status.label}
              </h3>
              {isCurrent && (
                <p className="text-sm text-muted-foreground">In progress...</p>
              )}
              {isCompleted && index < currentIndex && (
                <p className="text-sm text-muted-foreground">Completed</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
