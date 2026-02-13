import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import AdminAccessDenied from '../../pages/admin/AdminAccessDenied';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { actor, isFetching } = useActor();

  const { data: isAdmin, isLoading } = useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminAccessDenied />;
  }

  return <>{children}</>;
}
