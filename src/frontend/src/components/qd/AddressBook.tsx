import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zipCode: string;
}

interface AddressBookProps {
  selectedAddress: string | null;
  onSelectAddress: (id: string) => void;
}

export function AddressBook({ selectedAddress, onSelectAddress }: AddressBookProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      street: '123 Main St',
      city: 'Paris',
      zipCode: '75001'
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    zipCode: ''
  });

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.zipCode) {
      toast.error('Please fill all fields');
      return;
    }

    const address: Address = {
      id: Date.now().toString(),
      ...newAddress
    };

    setAddresses([...addresses, address]);
    setNewAddress({ label: '', street: '', city: '', zipCode: '' });
    setIsDialogOpen(false);
    toast.success('Address added');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Delivery Address
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label (e.g., Home, Office)</Label>
                  <Input
                    id="label"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddAddress} className="w-full">
                  Add Address
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {addresses.map((address) => (
          <button
            key={address.id}
            onClick={() => onSelectAddress(address.id)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedAddress === address.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold mb-1">{address.label}</p>
                <p className="text-sm text-muted-foreground">{address.street}</p>
                <p className="text-sm text-muted-foreground">
                  {address.city}, {address.zipCode}
                </p>
              </div>
              {selectedAddress === address.id && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
