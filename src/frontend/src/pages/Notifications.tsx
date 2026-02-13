import { useNavigate } from '@tanstack/react-router';
import { GradientShell } from '../components/qd/GradientShell';
import { EmptyState } from '../components/qd/EmptyState';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <GradientShell>
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/home' })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Notifications</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up!"
        />
      </main>
    </GradientShell>
  );
}
