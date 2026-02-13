import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { Product, ProductCategoryId } from '../../backend';

export function useProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching
  });
}

export function useProductById(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProductById(id);
    },
    enabled: !!actor && !isFetching
  });
}

export function useProductsByCategory(categoryId: ProductCategoryId) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching
  });
}
