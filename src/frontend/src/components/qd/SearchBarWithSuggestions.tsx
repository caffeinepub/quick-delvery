import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useProducts } from '../../hooks/qd/useProducts';
import { Product } from '../../backend';

export function SearchBarWithSuggestions() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data: products } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const suggestions = debouncedQuery.length > 0
    ? (products || []).filter(p => 
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSuggestionClick = (product: Product) => {
    setQuery('');
    setShowSuggestions(false);
    navigate({ to: `/product/${product.id}` });
  };

  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      navigate({ to: '/catalog', search: { q: query } });
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-12 h-12 rounded-2xl bg-card"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-lg border z-50 overflow-hidden animate-slide-up">
          {suggestions.map((product) => (
            <button
              key={Number(product.id)}
              onClick={() => handleSuggestionClick(product)}
              className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{product.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
