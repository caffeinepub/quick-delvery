import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../useActor';
import { useProducts } from '../useProducts';
import { ProductCategoryId } from '../../../backend';
import { useCouponsStore } from '../../../state/coupons';

const SAMPLE_PRODUCTS = [
  // Groceries
  {
    name: 'Brown Bread',
    description: 'Whole wheat bread loaf, freshly baked',
    price: 249,
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    categoryId: ProductCategoryId.Groceries,
    discount: { original: 299, discounted: 249, percentage: 17 }
  },
  {
    name: 'Basmati Rice 5kg',
    description: 'Premium long grain basmati rice',
    price: 1299,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    categoryId: ProductCategoryId.Groceries,
    discount: { original: 1499, discounted: 1299, percentage: 13 }
  },
  {
    name: 'Olive Oil 500ml',
    description: 'Extra virgin olive oil, cold pressed',
    price: 899,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    categoryId: ProductCategoryId.Groceries,
    discount: { original: 999, discounted: 899, percentage: 10 }
  },
  {
    name: 'Pasta 500g',
    description: 'Italian durum wheat pasta',
    price: 199,
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    categoryId: ProductCategoryId.Groceries,
    discount: { original: 249, discounted: 199, percentage: 20 }
  },
  {
    name: 'Honey 500g',
    description: 'Pure organic honey',
    price: 599,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400',
    categoryId: ProductCategoryId.Groceries,
    discount: { original: 699, discounted: 599, percentage: 14 }
  },
  {
    name: 'Peanut Butter',
    description: 'Creamy peanut butter 340g',
    price: 349,
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
    categoryId: ProductCategoryId.Groceries,
    discount: { original: 399, discounted: 349, percentage: 13 }
  },

  // Fruits
  {
    name: 'Fresh Bananas',
    description: 'Organic bananas from local farms, 1kg',
    price: 299,
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },
  {
    name: 'Red Apples',
    description: 'Crisp and sweet red apples, 1kg',
    price: 399,
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 449, discounted: 399, percentage: 11 }
  },
  {
    name: 'Fresh Oranges',
    description: 'Juicy oranges, 1kg',
    price: 349,
    stock: 85,
    imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 399, discounted: 349, percentage: 13 }
  },
  {
    name: 'Strawberries',
    description: 'Fresh strawberries, 250g pack',
    price: 499,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 599, discounted: 499, percentage: 17 }
  },
  {
    name: 'Watermelon',
    description: 'Sweet and juicy watermelon, whole',
    price: 299,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },
  {
    name: 'Grapes',
    description: 'Seedless green grapes, 500g',
    price: 449,
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1599819177331-6d0b4cd1e8d7?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 499, discounted: 449, percentage: 10 }
  },
  {
    name: 'Mangoes',
    description: 'Ripe and sweet mangoes, 1kg',
    price: 599,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
    categoryId: ProductCategoryId.Fruits,
    discount: { original: 699, discounted: 599, percentage: 14 }
  },

  // Vegetables
  {
    name: 'Fresh Tomatoes',
    description: 'Ripe red tomatoes, 500g',
    price: 199,
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 249, discounted: 199, percentage: 20 }
  },
  {
    name: 'Potatoes',
    description: 'Fresh potatoes, 1kg',
    price: 149,
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 179, discounted: 149, percentage: 17 }
  },
  {
    name: 'Onions',
    description: 'Fresh red onions, 1kg',
    price: 129,
    stock: 140,
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 159, discounted: 129, percentage: 19 }
  },
  {
    name: 'Carrots',
    description: 'Fresh carrots, 500g',
    price: 99,
    stock: 110,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 129, discounted: 99, percentage: 23 }
  },
  {
    name: 'Broccoli',
    description: 'Fresh broccoli, 500g',
    price: 249,
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 299, discounted: 249, percentage: 17 }
  },
  {
    name: 'Bell Peppers',
    description: 'Mixed color bell peppers, 500g',
    price: 299,
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },
  {
    name: 'Spinach',
    description: 'Fresh spinach leaves, 250g',
    price: 149,
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 179, discounted: 149, percentage: 17 }
  },
  {
    name: 'Cucumber',
    description: 'Fresh cucumbers, 500g',
    price: 99,
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400',
    categoryId: ProductCategoryId.Vegetables,
    discount: { original: 129, discounted: 99, percentage: 23 }
  },

  // Dairy
  {
    name: 'Whole Milk',
    description: 'Fresh whole milk, 1L',
    price: 349,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    categoryId: ProductCategoryId.Dairy,
    discount: { original: 399, discounted: 349, percentage: 13 }
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt, 500g',
    price: 299,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    categoryId: ProductCategoryId.Dairy,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },
  {
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese, 200g',
    price: 449,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
    categoryId: ProductCategoryId.Dairy,
    discount: { original: 499, discounted: 449, percentage: 10 }
  },
  {
    name: 'Butter',
    description: 'Salted butter, 250g',
    price: 249,
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
    categoryId: ProductCategoryId.Dairy,
    discount: { original: 299, discounted: 249, percentage: 17 }
  },
  {
    name: 'Fresh Cream',
    description: 'Heavy cream, 250ml',
    price: 199,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400',
    categoryId: ProductCategoryId.Dairy,
    discount: { original: 229, discounted: 199, percentage: 13 }
  },
  {
    name: 'Eggs (12 pack)',
    description: 'Farm fresh eggs, dozen',
    price: 299,
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    categoryId: ProductCategoryId.Dairy,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },

  // Snacks
  {
    name: 'Potato Chips',
    description: 'Crispy salted chips, 200g',
    price: 149,
    stock: 200,
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
    categoryId: ProductCategoryId.Snacks,
    discount: { original: 179, discounted: 149, percentage: 17 }
  },
  {
    name: 'Chocolate Bar',
    description: 'Dark chocolate bar, 100g',
    price: 199,
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
    categoryId: ProductCategoryId.Snacks,
    discount: { original: 229, discounted: 199, percentage: 13 }
  },
  {
    name: 'Mixed Nuts',
    description: 'Roasted mixed nuts, 250g',
    price: 399,
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
    categoryId: ProductCategoryId.Snacks,
    discount: { original: 449, discounted: 399, percentage: 11 }
  },
  {
    name: 'Cookies',
    description: 'Chocolate chip cookies, 300g',
    price: 249,
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    categoryId: ProductCategoryId.Snacks,
    discount: { original: 299, discounted: 249, percentage: 17 }
  },
  {
    name: 'Popcorn',
    description: 'Butter popcorn, 150g',
    price: 129,
    stock: 180,
    imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400',
    categoryId: ProductCategoryId.Snacks,
    discount: { original: 159, discounted: 129, percentage: 19 }
  },
  {
    name: 'Granola Bars',
    description: 'Healthy granola bars, 6 pack',
    price: 299,
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4cda8bf6?w=400',
    categoryId: ProductCategoryId.Snacks,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },

  // Beverages
  {
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice, 1L',
    price: 399,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    categoryId: ProductCategoryId.Beverages,
    discount: { original: 449, discounted: 399, percentage: 11 }
  },
  {
    name: 'Green Tea',
    description: 'Premium green tea bags, 25 count',
    price: 249,
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    categoryId: ProductCategoryId.Beverages,
    discount: { original: 299, discounted: 249, percentage: 17 }
  },
  {
    name: 'Coffee Beans',
    description: 'Arabica coffee beans, 250g',
    price: 599,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    categoryId: ProductCategoryId.Beverages,
    discount: { original: 699, discounted: 599, percentage: 14 }
  },
  {
    name: 'Sparkling Water',
    description: 'Carbonated mineral water, 1L',
    price: 149,
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400',
    categoryId: ProductCategoryId.Beverages,
    discount: { original: 179, discounted: 149, percentage: 17 }
  },
  {
    name: 'Energy Drink',
    description: 'Energy drink, 250ml',
    price: 199,
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1622543925917-763c34f6a1a7?w=400',
    categoryId: ProductCategoryId.Beverages,
    discount: { original: 229, discounted: 199, percentage: 13 }
  },

  // Bakery
  {
    name: 'Croissants',
    description: 'Butter croissants, 4 pack',
    price: 349,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    categoryId: ProductCategoryId.Bakery,
    discount: { original: 399, discounted: 349, percentage: 13 }
  },
  {
    name: 'Bagels',
    description: 'Plain bagels, 6 pack',
    price: 299,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29e84?w=400',
    categoryId: ProductCategoryId.Bakery,
    discount: { original: 349, discounted: 299, percentage: 14 }
  },
  {
    name: 'Muffins',
    description: 'Blueberry muffins, 4 pack',
    price: 399,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
    categoryId: ProductCategoryId.Bakery,
    discount: { original: 449, discounted: 399, percentage: 11 }
  }
];

export function useSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: existingProducts } = useProducts();
  const seedCoupons = useCouponsStore(state => state.seedCoupons);

  const seedProducts = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      // Check if products already exist (idempotent)
      if (existingProducts && existingProducts.length > 0) {
        return { alreadySeeded: true };
      }

      // Add sample products
      for (const product of SAMPLE_PRODUCTS) {
        const id = BigInt(Date.now() + Math.floor(Math.random() * 10000));
        await actor.addProduct(
          id,
          product.name,
          product.description,
          BigInt(product.price),
          BigInt(product.stock),
          product.imageUrl,
          BigInt(product.discount.original),
          BigInt(product.discount.discounted),
          product.discount.percentage,
          null,
          48.8566,
          2.3522,
          product.categoryId
        );
      }

      // Seed coupons
      seedCoupons();

      return { alreadySeeded: false };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  return {
    seedProducts,
    isSeeding: seedProducts.isPending
  };
}
