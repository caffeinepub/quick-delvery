import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../useActor';
import { ProductCategoryId } from '../../../backend';

interface ProductData {
  id: bigint;
  name: string;
  desc: string;
  price: bigint;
  stock: bigint;
  imageUrl: string;
  origPrice: bigint;
  discPrice: bigint;
  discPerc: number;
  icon: null;
  lat: number;
  long: number;
  categoryId: ProductCategoryId;
}

export function useAdminProducts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const addProduct = useMutation({
    mutationFn: async (data: ProductData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addProduct(
        data.id,
        data.name,
        data.desc,
        data.price,
        data.stock,
        data.imageUrl,
        data.origPrice,
        data.discPrice,
        data.discPerc,
        data.icon,
        data.lat,
        data.long,
        data.categoryId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const updateProduct = useMutation({
    mutationFn: async (data: ProductData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProduct(
        data.id,
        data.name,
        data.desc,
        data.price,
        data.stock,
        data.imageUrl,
        data.origPrice,
        data.discPrice,
        data.discPerc,
        data.icon,
        data.lat,
        data.long,
        data.categoryId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  return {
    addProduct,
    updateProduct,
    deleteProduct
  };
}
