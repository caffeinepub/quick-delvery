import { create } from 'zustand';

export interface Coupon {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  description: string;
  minPurchase?: number;
}

interface CouponsState {
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  isSeeded: boolean;
  seedCoupons: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: '10% off on all orders',
    minPurchase: 0
  },
  {
    code: 'FLAT20',
    type: 'flat',
    value: 20,
    description: '$20 off on orders above $100',
    minPurchase: 100
  },
  {
    code: 'WELCOME15',
    type: 'percentage',
    value: 15,
    description: '15% off for new customers',
    minPurchase: 50
  },
  {
    code: 'FRESH25',
    type: 'percentage',
    value: 25,
    description: '25% off on fresh produce',
    minPurchase: 30
  },
  {
    code: 'MEGA50',
    type: 'flat',
    value: 50,
    description: '$50 off on orders above $200',
    minPurchase: 200
  }
];

export const useCouponsStore = create<CouponsState>((set, get) => ({
  availableCoupons: [],
  appliedCoupon: null,
  isSeeded: false,

  seedCoupons: () => {
    const { isSeeded } = get();
    if (!isSeeded) {
      set({ availableCoupons: DEFAULT_COUPONS, isSeeded: true });
    }
  },

  applyCoupon: (code: string) => {
    const { availableCoupons } = get();
    const coupon = availableCoupons.find(
      c => c.code.toUpperCase() === code.toUpperCase()
    );

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }

    set({ appliedCoupon: coupon });
    return { 
      success: true, 
      message: `Coupon applied: ${coupon.description}` 
    };
  },

  removeCoupon: () => {
    set({ appliedCoupon: null });
  },

  calculateDiscount: (subtotal: number) => {
    const { appliedCoupon } = get();
    if (!appliedCoupon) return 0;

    if (appliedCoupon.minPurchase && subtotal < appliedCoupon.minPurchase) {
      return 0;
    }

    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.value) / 100;
    } else {
      return appliedCoupon.value;
    }
  }
}));
