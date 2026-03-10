import { getNetworkStatus } from "@/services/network/network.service";
import { useSyncStore } from "@/stores/sync.store";
import { useEffect } from "react";

export function useNetworkMonitor() {
  const setOnlineStatus = useSyncStore((state) => state.setOnlineStatus);

  useEffect(() => {
    async function checkConnection() {
      const status = await getNetworkStatus();

      const online =
        status.isConnected === true && status.isInternetReachable !== false;

      setOnlineStatus(online);
    }

    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, [setOnlineStatus]);
}
