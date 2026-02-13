import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { ProductCard } from '../components/qd/ProductCard';
import { ProductCardSkeleton } from '../components/qd/Skeletons';
import { EmptyState } from '../components/qd/EmptyState';
import { useProducts, useProductsByCategory } from '../hooks/qd/useProducts';
import { ProductCategoryId } from '../backend';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

const CATEGORY_MAP: Record<string, ProductCategoryId> = {
  'groceries': ProductCategoryId.Groceries,
  'fruits': ProductCategoryId.Fruits,
  'vegetables': ProductCategoryId.Vegetables,
  'dairy': ProductCategoryId.Dairy,
  'snacks': ProductCategoryId.Snacks,
  'bakery': ProductCategoryId.Bakery,
  'beverages': ProductCategoryId.Beverages
};

export default function Catalog() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { category?: string; q?: string };
  
  const categoryId = search.category ? CATEGORY_MAP[search.category.toLowerCase()] : undefined;
  
  const { data: allProducts, isLoading: allLoading } = useProducts();
  const { data: categoryProducts, isLoading: categoryLoading } = useProductsByCategory(
    categoryId || ProductCategoryId.Groceries
  );

  const isLoading = categoryId ? categoryLoading : allLoading;
  const products = categoryId ? categoryProducts : allProducts;

  const filteredProducts = products?.filter(p => {
    if (search.q) {
      return p.name.toLowerCase().includes(search.q.toLowerCase()) ||
             p.description.toLowerCase().includes(search.q.toLowerCase());
    }
    return true;
  }) || [];

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/home' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">
                {search.category ? search.category.charAt(0).toUpperCase() + search.category.slice(1) : 'All Products'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No products found"
            description="Try adjusting your search or browse other categories"
            actionLabel="Back to Home"
            onAction={() => navigate({ to: '/home' })}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={Number(product.id)} product={product} />
            ))}
          </div>
        )}
      </main>
    </GradientShell>
  );
}
