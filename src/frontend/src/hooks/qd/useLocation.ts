import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { Location } from '../../backend';

export function useLocation() {
  const { actor, isFetching } = useActor();

  return useQuery<Location | null>({
    queryKey: ['callerLocation'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerLocation();
    },
    enabled: !!actor && !isFetching
  });
}

export function useAddLocation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lat, long }: { lat: number; long: number }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addLocation(lat, long);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerLocation'] });
      queryClient.invalidateQueries({ queryKey: ['serviceAvailability'] });
    }
  });
}
