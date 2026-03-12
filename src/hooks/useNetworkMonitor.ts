import * as Network from "expo-network";
import { useEffect, useRef } from "react";

import { getLastSyncAt, runSync } from "@/services/sync.service";
import { useSyncStore } from "@/stores/sync.store";
import { useWorkOrdersStore } from "@/stores/workOrders.store";

function isOnlineState(state: Network.NetworkState) {
  return state.isConnected === true && state.isInternetReachable !== false;
}

export function useNetworkMonitor() {
  const setOnlineStatus = useSyncStore((state) => state.setOnlineStatus);
  const setSyncing = useSyncStore((state) => state.setSyncing);
  const setSyncError = useSyncStore((state) => state.setSyncError);
  const setLastSyncAt = useSyncStore((state) => state.setLastSyncAt);

  const loadFromRealm = useWorkOrdersStore((state) => state.loadFromRealm);

  const wasOnlineRef = useRef<boolean | null>(null);
  const syncInFlightRef = useRef(false);

  async function syncIfNeeded(online: boolean, isInitial = false) {
    setOnlineStatus(online);

    const wasOnline = wasOnlineRef.current;
    wasOnlineRef.current = online;

    const cameBackOnline = wasOnline === false && online === true;
    const shouldSyncOnInit = isInitial && online === true;
    const shouldOnlyLoadLocal = isInitial;

    if (shouldOnlyLoadLocal) {
      await loadFromRealm();
    }

    if (!cameBackOnline && !shouldSyncOnInit) {
      return;
    }

    if (syncInFlightRef.current) {
      return;
    }

    try {
      syncInFlightRef.current = true;
      setSyncing(true);
      setSyncError(null);

      await runSync();
      await loadFromRealm();

      const lastSync = await getLastSyncAt();
      setLastSyncAt(lastSync);
    } catch {
      setSyncError("Falha ao sincronizar dados.");
    } finally {
      syncInFlightRef.current = false;
      setSyncing(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const initialState = await Network.getNetworkStateAsync();

      if (!isMounted) return;

      await syncIfNeeded(isOnlineState(initialState), true);
    }

    bootstrap();

    const subscription = Network.addNetworkStateListener(async (state) => {
      if (!isMounted) return;
      await syncIfNeeded(isOnlineState(state), false);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [loadFromRealm, setLastSyncAt, setOnlineStatus, setSyncError, setSyncing]);
}
