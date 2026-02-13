import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function NotificationsBell() {
  const navigate = useNavigate();
  const unreadCount = 0; // Mock unread count

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => navigate({ to: '/notifications' })}
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Button>
  );
}
