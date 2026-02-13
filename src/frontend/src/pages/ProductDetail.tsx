import { useNavigate, useParams } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { useProductById } from '../hooks/qd/useProducts';
import { AddToCartButton } from '../components/qd/AddToCartButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Package } from 'lucide-react';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams({ strict: false }) as { productId: string };
  const { data: product, isLoading } = useProductById(BigInt(productId));

  if (isLoading) {
    return (
      <GradientShell>
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Skeleton className="h-96 w-full rounded-3xl mb-6" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-24 w-full" />
        </div>
      </GradientShell>
    );
  }

  if (!product) {
    return (
      <GradientShell>
        <div className="container mx-auto px-4 py-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <Button onClick={() => navigate({ to: '/home' })}>Back to Home</Button>
        </div>
      </GradientShell>
    );
  }

  const hasDiscount = product.discounts.discountPercentage > 0;
  const isOutOfStock = Number(product.stock) === 0;

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: '/catalog' })}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
            <img
              src={product.imageUrl || '/assets/generated/quick-d-combined-logo.dim_512x512.png'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-4 py-2">
                {Math.round(product.discounts.discountPercentage)}% OFF
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              {hasDiscount ? (
                <>
                  <span className="text-4xl font-bold text-primary">
                    ${Number(product.discounts.discountedPrice)}
                  </span>
                  <span className="text-2xl text-muted-foreground line-through">
                    ${Number(product.discounts.originalPrice)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-primary">
                  ${Number(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={isOutOfStock ? 'destructive' : 'secondary'}>
                {isOutOfStock ? 'Out of Stock' : `${Number(product.stock)} in stock`}
              </Badge>
            </div>

            <AddToCartButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </main>
    </GradientShell>
  );
}
