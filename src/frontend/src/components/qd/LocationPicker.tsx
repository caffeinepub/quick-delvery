import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Navigation } from 'lucide-react';
import { useLocation, useAddLocation } from '../../hooks/qd/useLocation';
import { toast } from 'sonner';

export function LocationPicker() {
  const { data: savedLocation } = useLocation();
  const { mutate: addLocation, isPending } = useAddLocation();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  useEffect(() => {
    if (savedLocation) {
      setLat(savedLocation.latitude.toString());
      setLong(savedLocation.longitude.toString());
    }
  }, [savedLocation]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude.toString());
        setLong(longitude.toString());
        toast.success('Location detected');
      },
      (error) => {
        toast.error('Failed to get location: ' + error.message);
      }
    );
  };

  const handleSave = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    if (isNaN(latitude) || isNaN(longitude)) {
      toast.error('Please enter valid coordinates');
      return;
    }

    addLocation(
      { lat: latitude, long: longitude },
      {
        onSuccess: () => {
          toast.success('Location saved successfully');
        },
        onError: () => {
          toast.error('Failed to save location');
        }
      }
    );
  };

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGetCurrentLocation}
      >
        <Navigation className="w-4 h-4 mr-2" />
        Use Current Location
      </Button>

      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="number"
          step="any"
          placeholder="e.g., 48.8566"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          type="number"
          step="any"
          placeholder="e.g., 2.3522"
          value={long}
          onChange={(e) => setLong(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={isPending || !lat || !long}
      >
        <MapPin className="w-4 h-4 mr-2" />
        {isPending ? 'Saving...' : 'Save Location'}
      </Button>

      {savedLocation && (
        <p className="text-sm text-muted-foreground text-center">
          Current: {savedLocation.latitude.toFixed(4)}, {savedLocation.longitude.toFixed(4)}
        </p>
      )}
    </div>
  );
}
