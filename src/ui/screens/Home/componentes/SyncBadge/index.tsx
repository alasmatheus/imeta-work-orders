import { Text, View } from "react-native";

import { styles } from "./styles";

type SyncBadgeProps = {
  syncStatus: "synced" | "pending" | "error";
};

function getSyncLabel(syncStatus: SyncBadgeProps["syncStatus"]) {
  switch (syncStatus) {
    case "pending":
      return "Pendente";
    case "error":
      return "Erro";
    default:
      return "Sincronizada";
  }
}

export function SyncBadge({ syncStatus }: SyncBadgeProps) {
  const isPending = syncStatus === "pending";
  const isError = syncStatus === "error";

  return (
    <View
      style={[
        styles.badge,
        isPending
          ? styles.badgePending
          : isError
            ? styles.badgeError
            : styles.badgeSynced,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isPending
            ? styles.badgeTextPending
            : isError
              ? styles.badgeTextError
              : styles.badgeTextSynced,
        ]}
      >
        {getSyncLabel(syncStatus)}
      </Text>
    </View>
  );
}
