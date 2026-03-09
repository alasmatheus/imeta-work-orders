import * as Network from "expo-network";

export async function getNetworkStatus() {
  const state = await Network.getNetworkStateAsync();

  return {
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable ?? false,
  };
}
