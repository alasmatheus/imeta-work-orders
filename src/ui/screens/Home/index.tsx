import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Container } from "@/components/Container";
import { LocalWorkOrder } from "@/domain/workOrders/localWorkOrder";
import { AppNavigatorRoutesProps } from "@/routes/appBottom.routes";
import { getLastSyncAt, runSync } from "@/services/sync.service";
import { useSyncStore } from "@/stores/sync.store";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { THEME } from "@/theme";
import { formatDateTime } from "@/utils/date";
import { SyncBadge } from "./componentes/SyncBadge";
import { SyncStatusCard } from "./componentes/SyncStatusCard";
import { WorkOrderDetailsModal } from "./componentes/WorkOrderDetailsModal";
import { styles } from "./styles";

function getStatusLabel(status: string) {
  switch (status) {
    case "Pending":
      return "Pendente";
    case "In Progress":
      return "Em andamento";
    case "Completed":
      return "Concluída";
    default:
      return status;
  }
}

function getSyncLabel(syncStatus: string) {
  switch (syncStatus) {
    case "pending":
      return "Pendente de sync";
    case "error":
      return "Erro no sync";
    default:
      return "Sincronizada";
  }
}

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const isOnline = useSyncStore((state) => state.isOnline);
  const isSyncing = useSyncStore((state) => state.isSyncing);
  const lastSyncAt = useSyncStore((state) => state.lastSyncAt);
  const syncError = useSyncStore((state) => state.syncError);
  const setSyncing = useSyncStore((state) => state.setSyncing);
  const setSyncError = useSyncStore((state) => state.setSyncError);
  const setLastSyncAt = useSyncStore((state) => state.setLastSyncAt);

  const items = useWorkOrdersStore((state) => state.items);
  const loading = useWorkOrdersStore((state) => state.loading);
  const error = useWorkOrdersStore((state) => state.error);
  const loadWorkOrders = useWorkOrdersStore((state) => state.loadWorkOrders);
  const softDeleteLocal = useWorkOrdersStore((state) => state.softDeleteLocal);

  const [selectedItem, setSelectedItem] = useState<LocalWorkOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    loadWorkOrders();
  }, [loadWorkOrders]);

  async function handleManualSync() {
    if (!isOnline || isSyncing) return;

    try {
      setSyncing(true);
      setSyncError(null);

      await runSync();
      await loadWorkOrders();

      const syncDate = await getLastSyncAt();
      setLastSyncAt(syncDate);
    } catch {
      setSyncError("Não foi possível sincronizar agora.");
    } finally {
      setSyncing(false);
    }
  }

  function handleOpenDetails(item: any) {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  }

  function handleCloseDetails() {
    setSelectedItem(null);
    setIsDetailsModalOpen(false);
  }

  function handleNavigateEdit(itemId: string) {
    handleCloseDetails();
    navigation.navigate("edit", { id: itemId });
  }

  function handleRemove(item: any) {
    Alert.alert("Remover ordem", `Deseja remover a ordem "${item.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          await softDeleteLocal(item.id);
          handleCloseDetails();
        },
      },
    ]);
  }

  return (
    <Container loading={loading} backgroundColor={THEME.colors.background}>
      <View style={styles.wrapper}>
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>INMETA</Text>
            <Text style={styles.title}>Ordens de serviço</Text>
            <Text style={styles.subtitle}>
              Dados locais armazenados no Realm.
            </Text>
          </View>

          <View
            style={[
              styles.statusChip,
              isOnline ? styles.statusChipOnline : styles.statusChipOffline,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isOnline ? styles.statusDotOnline : styles.statusDotOffline,
              ]}
            />
            <Text
              style={[
                styles.statusChipText,
                isOnline
                  ? styles.statusChipTextOnline
                  : styles.statusChipTextOffline,
              ]}
            >
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>

        {!isOnline && (
          <View style={styles.bannerWarning}>
            <Text style={styles.bannerWarningTitle}>Modo offline</Text>
            <Text style={styles.bannerWarningText}>
              As alterações continuam disponíveis localmente e serão
              sincronizadas quando a conexão voltar.
            </Text>
          </View>
        )}

        {error && (
          <View style={styles.bannerError}>
            <Text style={styles.bannerErrorText}>{error}</Text>
          </View>
        )}

        <View style={styles.syncCardWrapper}>
          <SyncStatusCard
            isOnline={isOnline}
            isSyncing={isSyncing}
            lastSyncAt={lastSyncAt}
            syncError={syncError}
            onSync={handleManualSync}
          />
        </View>

        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={loading || isSyncing}
              onRefresh={() => loadWorkOrders()}
              tintColor={THEME.colors.primary}
            />
          }
          contentContainerStyle={[
            styles.listContent,
            items.length === 0 && styles.emptyListContent,
          ]}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>
                Nenhuma ordem de serviço encontrada
              </Text>
              <Text style={styles.emptyText}>
                Quando houver ordens disponíveis, elas aparecerão aqui.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.96}
              style={styles.cardItem}
              onPress={() => handleOpenDetails(item)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>

                <View style={styles.cardHeaderRight}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("edit", { id: item.id })}
                  >
                    <Feather
                      name="edit-2"
                      size={17}
                      color={THEME.colors.primary}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.8}
                    onPress={() => handleRemove(item)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={19}
                      color={THEME.colors.danger}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.badgesRow}>
                <View
                  style={[
                    styles.badge,
                    item.status === "Completed"
                      ? styles.badgeCompleted
                      : item.status === "In Progress"
                        ? styles.badgeInProgress
                        : styles.badgePending,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      item.status === "Completed"
                        ? styles.badgeTextCompleted
                        : item.status === "In Progress"
                          ? styles.badgeTextInProgress
                          : styles.badgeTextPending,
                    ]}
                  >
                    {getStatusLabel(item.status)}
                  </Text>
                </View>

                <SyncBadge syncStatus={item.syncStatus} />
              </View>

              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.metaGrid}>
                <View style={styles.metaColumn}>
                  <Text style={styles.metaLabel}>Técnico</Text>
                  <Text style={styles.metaValueLeft} numberOfLines={1}>
                    {item.assignedTo}
                  </Text>
                </View>

                <View style={styles.metaColumn}>
                  <Text style={styles.metaLabel}>Atualizada</Text>
                  <Text style={styles.metaValueRight}>
                    {formatDateTime(item.updatedAt)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <WorkOrderDetailsModal
        visible={isDetailsModalOpen}
        item={selectedItem}
        onClose={handleCloseDetails}
        onEdit={handleNavigateEdit}
        getStatusLabel={getStatusLabel}
        getSyncLabel={getSyncLabel}
      />
    </Container>
  );
}
