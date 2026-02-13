import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import { useLocation } from './useLocation';

export function useServiceAvailability() {
  const { actor, isFetching: actorFetching } = useActor();
  const { data: location } = useLocation();

  const query = useQuery<boolean>({
    queryKey: ['serviceAvailability', location?.latitude, location?.longitude],
    queryFn: async () => {
      if (!actor || !location) return false;
      return actor.isServiceAvailable(location.latitude, location.longitude);
    },
    enabled: !!actor && !actorFetching && !!location
  });

  return {
    isAvailable: query.data ?? false,
    isLoading: query.isLoading
  };
}
