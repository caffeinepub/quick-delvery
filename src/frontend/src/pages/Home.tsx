import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { BannerCarousel } from '../components/qd/BannerCarousel';
import { SearchBarWithSuggestions } from '../components/qd/SearchBarWithSuggestions';
import { ProductCard } from '../components/qd/ProductCard';
import { useProducts } from '../hooks/qd/useProducts';
import { ProductCardSkeleton } from '../components/qd/Skeletons';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Package, Apple, Milk, Coffee, Sparkles, Croissant, Wine } from 'lucide-react';
import { NotificationsBell } from '../components/qd/NotificationsBell';
import { useCartStore } from '../state/cart';

const CATEGORIES = [
  { id: 'groceries', name: 'Groceries', icon: Package },
  { id: 'fruits', name: 'Fruits', icon: Apple },
  { id: 'vegetables', name: 'Vegetables', icon: Sparkles },
  { id: 'dairy', name: 'Dairy', icon: Milk },
  { id: 'snacks', name: 'Snacks', icon: Coffee },
  { id: 'bakery', name: 'Bakery', icon: Croissant },
  { id: 'beverages', name: 'Beverages', icon: Wine }
];

export default function Home() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const cartItemCount = useCartStore(state => state.items.length);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate({ to: '/catalog', search: { category: categoryId } });
  };

  const trendingProducts = products?.slice(0, 6) || [];
  const recommendedProducts = products?.slice(6, 12) || [];

  return (
    <GradientShell>
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-2">
                <img 
                  src="/assets/generated/quick-d-combined-logo.dim_512x512.png" 
                  alt="QUICK-D" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold">QUICK-D</h1>
                <p className="text-xs text-muted-foreground">Deliver to your location</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotificationsBell />
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate({ to: '/cart' })}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/profile' })}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8 pb-24">
        {/* Search Bar */}
        <SearchBarWithSuggestions />

        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Categories */}
        <section>
          <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card hover:bg-accent transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-center">{category.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Trending Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Trending Now</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/catalog' })}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : (
              trendingProducts.map((product) => (
                <ProductCard key={Number(product.id)} product={product} />
              ))
            )}
          </div>
        </section>

        {/* Recommended Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/catalog' })}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            ) : (
              recommendedProducts.map((product) => (
                <ProductCard key={Number(product.id)} product={product} />
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} QUICK-D. Built with ❤️ using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </GradientShell>
  );
}
