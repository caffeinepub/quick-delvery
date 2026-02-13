import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, CheckCircle } from 'lucide-react';
import { useSeedData } from '../../hooks/qd/admin/useSeedData';
import { toast } from 'sonner';

export default function AdminSeed() {
  const { seedProducts, isSeeding } = useSeedData();
  const [seeded, setSeeded] = useState(false);

  const handleSeed = () => {
    seedProducts.mutate(undefined, {
      onSuccess: (data) => {
        setSeeded(true);
        if (data?.alreadySeeded) {
          toast.info('Sample data already exists');
        } else {
          toast.success('Sample data initialized successfully - dozens of products across all categories added!');
        }
      },
      onError: () => {
        toast.error('Failed to initialize data');
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Seed Data</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Initialize Sample Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This will add dozens of sample products across all categories (Groceries, Fruits, Vegetables, Dairy, Snacks, Bakery, Beverages) and initialize coupon codes. This operation is idempotent and won't duplicate existing data.
          </p>
          
          {seeded && (
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Sample data has been initialized</span>
            </div>
          )}

          <Button 
            onClick={handleSeed} 
            disabled={isSeeding || seeded}
            className="w-full"
          >
            {isSeeding ? 'Initializing...' : seeded ? 'Data Already Initialized' : 'Initialize Sample Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
