import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { useCartStore } from '../../state/cart';
import { Product } from '../../backend';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function AddToCartButton({ product, disabled, onClick }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e);
    
    if (disabled) {
      toast.error('This product is out of stock');
      return;
    }

    addItem({
      productId: Number(product.id),
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      quantity: 1
    });

    setAdded(true);
    toast.success('Added to cart');
    
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button
      size="sm"
      className="w-full"
      onClick={handleClick}
      disabled={disabled}
      variant={added ? 'secondary' : 'default'}
    >
      {added ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Added
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-1" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
