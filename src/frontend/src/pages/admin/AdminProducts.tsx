import { useState } from 'react';
import { useProducts } from '../../hooks/qd/useProducts';
import { useAdminProducts } from '../../hooks/qd/admin/useAdminProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProductCardSkeleton } from '../../components/qd/Skeletons';
import { Product, ProductCategoryId } from '../../backend';

const CATEGORY_OPTIONS = [
  { value: ProductCategoryId.Groceries, label: 'Groceries' },
  { value: ProductCategoryId.Fruits, label: 'Fruits' },
  { value: ProductCategoryId.Vegetables, label: 'Vegetables' },
  { value: ProductCategoryId.Dairy, label: 'Dairy' },
  { value: ProductCategoryId.Snacks, label: 'Snacks' },
  { value: ProductCategoryId.Bakery, label: 'Bakery' },
  { value: ProductCategoryId.Beverages, label: 'Beverages' }
];

export default function AdminProducts() {
  const { data: products, isLoading } = useProducts();
  const { addProduct, updateProduct, deleteProduct } = useAdminProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    originalPrice: '',
    discountedPrice: '',
    discountPercentage: '',
    categoryId: ProductCategoryId.Groceries
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill required fields');
      return;
    }

    const data = {
      id: editingProduct ? editingProduct.id : BigInt(Date.now()),
      name: formData.name,
      desc: formData.description,
      price: BigInt(formData.price || 0),
      stock: BigInt(formData.stock || 0),
      imageUrl: formData.imageUrl,
      origPrice: BigInt(formData.originalPrice || formData.price || 0),
      discPrice: BigInt(formData.discountedPrice || formData.price || 0),
      discPerc: parseFloat(formData.discountPercentage || '0'),
      icon: null,
      lat: 48.8566,
      long: 2.3522,
      categoryId: formData.categoryId
    };

    const mutation = editingProduct ? updateProduct : addProduct;
    
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success(editingProduct ? 'Product updated' : 'Product added');
        setIsDialogOpen(false);
        resetForm();
      },
      onError: () => {
        toast.error('Operation failed');
      }
    });
  };

  const handleDelete = (id: bigint) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id, {
        onSuccess: () => toast.success('Product deleted'),
        onError: () => toast.error('Delete failed')
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
      originalPrice: '',
      discountedPrice: '',
      discountPercentage: '',
      categoryId: ProductCategoryId.Groceries
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl,
      originalPrice: product.discounts.originalPrice.toString(),
      discountedPrice: product.discounts.discountedPrice.toString(),
      discountPercentage: product.discounts.discountPercentage.toString(),
      categoryId: product.categoryId
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value as ProductCategoryId })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price *</Label>
                  <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Original Price</Label>
                  <Input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Discounted Price</Label>
                  <Input type="number" value={formData.discountedPrice} onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Discount %</Label>
                  <Input type="number" value={formData.discountPercentage} onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })} />
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <Card key={Number(product.id)}>
              <CardContent className="p-4">
                <img
                  src={product.imageUrl || '/assets/generated/quick-delvery-logo.dim_512x512.png'}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-primary mb-3">${Number(product.price)}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                    <Pencil className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
