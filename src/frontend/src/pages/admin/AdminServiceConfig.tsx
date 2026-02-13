import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminServiceConfig() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Service Configuration</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Delivery Radius & Store Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Current Store Location</p>
              <p className="text-muted-foreground">Paris, France (48.8566, 2.3522)</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Delivery Radius</p>
              <p className="text-muted-foreground">15 km</p>
            </div>
            <p className="text-sm text-muted-foreground">
              To change these settings, modify the backend code in main.mo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
