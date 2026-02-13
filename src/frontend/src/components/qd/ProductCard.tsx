import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from './AddToCartButton';
import { Product } from '../../backend';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const hasDiscount = product.discounts.discountPercentage > 0;
  const isOutOfStock = Number(product.stock) === 0;

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
      onClick={() => navigate({ to: `/product/${product.id}` })}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square bg-muted">
          <img
            src={product.imageUrl || '/assets/generated/quick-d-combined-logo.dim_512x512.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              {Math.round(product.discounts.discountPercentage)}% OFF
            </Badge>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-primary">
                  ${Number(product.discounts.discountedPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${Number(product.discounts.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${Number(product.price)}
              </span>
            )}
          </div>
          <AddToCartButton 
            product={product} 
            disabled={isOutOfStock}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </CardContent>
    </Card>
  );
}
