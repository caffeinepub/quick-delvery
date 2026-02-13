import { useQuery } from '@tanstack/react-query';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      // Mock notifications - will be replaced with backend call
      return [];
    },
    refetchInterval: 30000 // Poll every 30 seconds
  });
}
