import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export default function OutOfRadius() {
  const navigate = useNavigate();

  return (
    <GradientShell>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6 animate-slide-up">
          <img
            src="/assets/generated/qd-out-of-radius.dim_1200x900.png"
            alt="Service not available"
            className="w-full max-w-sm mx-auto"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">QUICK-D is not available in your area yet</h1>
            <p className="text-muted-foreground">
              We currently deliver within a 15km radius. Update your location to check availability.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate({ to: '/profile' })}
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Update Location
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/home' })}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </GradientShell>
  );
}
