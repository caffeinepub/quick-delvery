import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AdminAccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
          <ShieldAlert className="w-12 h-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the admin panel.
          </p>
        </div>
        <Button onClick={() => navigate({ to: '/home' })}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
