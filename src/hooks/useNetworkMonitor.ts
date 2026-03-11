import { useEffect, useRef } from "react";

import { getNetworkStatus } from "@/services/network/network.service";
import { getLastSyncAt, runSync } from "@/services/sync.service";
import { useSyncStore } from "@/stores/sync.store";
import { useWorkOrdersStore } from "@/stores/workOrders.store";

export function useNetworkMonitor() {
  const setOnlineStatus = useSyncStore((state) => state.setOnlineStatus);
  const setSyncing = useSyncStore((state) => state.setSyncing);
  const setSyncError = useSyncStore((state) => state.setSyncError);
  const setLastSyncAt = useSyncStore((state) => state.setLastSyncAt);

  const loadFromRealm = useWorkOrdersStore((state) => state.loadFromRealm);

  const wasOnlineRef = useRef<boolean | null>(null);

  useEffect(() => {
    async function checkConnection() {
      const status = await getNetworkStatus();

      const online =
        status.isConnected === true && status.isInternetReachable !== false;

      setOnlineStatus(online);

      const wasOnline = wasOnlineRef.current;
      wasOnlineRef.current = online;

      if (wasOnline === false && online === true) {
        try {
          setSyncing(true);
          setSyncError(null);

          await runSync();
          await loadFromRealm();

          const lastSyncAt = await getLastSyncAt();
          setLastSyncAt(lastSyncAt);
        } catch {
          setSyncError("Falha ao sincronizar dados.");
        } finally {
          setSyncing(false);
        }
      }

      if (wasOnline === null) {
        await loadFromRealm();

        if (online) {
          try {
            setSyncing(true);
            setSyncError(null);

            await runSync();
            await loadFromRealm();

            const lastSyncAt = await getLastSyncAt();
            setLastSyncAt(lastSyncAt);
          } catch {
            setSyncError("Falha ao sincronizar dados.");
          } finally {
            setSyncing(false);
          }
        }
      }
    }

    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, [loadFromRealm, setLastSyncAt, setOnlineStatus, setSyncError, setSyncing]);
}
