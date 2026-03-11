import { ActivityIndicator, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { THEME } from "@/theme";
import { formatDateTime } from "@/utils/date";
import { styles } from "./styles";

type SyncStatusCardProps = {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncAt: string | null;
  syncError: string | null;
  onSync: () => void;
};

export function SyncStatusCard({
  isOnline,
  isSyncing,
  lastSyncAt,
  syncError,
  onSync,
}: SyncStatusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.content}>
          <Text style={styles.label}>Sincronização</Text>
          <Text style={styles.value}>
            {isOnline ? "Conectado ao servidor" : "Sem conexão"}
          </Text>
        </View>

        {isSyncing ? (
          <View style={styles.syncingBox}>
            <ActivityIndicator size="small" color={THEME.colors.primary} />
            <Text style={styles.syncingText}>Sincronizando</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Última sincronização</Text>
        <Text style={styles.infoValue}>{formatDateTime(lastSyncAt)}</Text>
      </View>

      {syncError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{syncError}</Text>
        </View>
      ) : null}

      <View style={styles.buttonWrapper}>
        <Button
          title={isOnline ? "Sincronizar agora" : "Aguardando conexão"}
          onPress={onSync}
          disabled={!isOnline || isSyncing}
          isLoading={isSyncing}
          bgColor={THEME.colors.primary}
        />
      </View>
    </View>
  );
}
