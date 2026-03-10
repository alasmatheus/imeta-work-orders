import { useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Container } from "@components/Container";
import { useSyncStore } from "@stores/sync.store";
import { useWorkOrdersStore } from "@stores/workOrders.store";
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
  const isOnline = useSyncStore((state) => state.isOnline);

  const items = useWorkOrdersStore((state) => state.items);
  const loading = useWorkOrdersStore((state) => state.loading);
  const error = useWorkOrdersStore((state) => state.error);
  const loadWorkOrders = useWorkOrdersStore((state) => state.loadWorkOrders);

  useEffect(() => {
    loadWorkOrders(isOnline);
  }, [isOnline, loadWorkOrders]);

  return (
    <Container loading={loading} backgroundColor="#F8F9FA">
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>FieldSync</Text>
            <Text style={styles.title}>Ordens de serviço</Text>
            <Text style={styles.subtitle}>
              Visualize e acompanhe as ordens disponíveis.
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
              Exibindo dados salvos localmente. Novas alterações serão
              sincronizadas quando a conexão voltar.
            </Text>
          </View>
        )}

        {error && (
          <View style={styles.bannerError}>
            <Text style={styles.bannerErrorText}>{error}</Text>
          </View>
        )}

        <View style={styles.summaryCard}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{items.length}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Fonte</Text>
            <Text style={styles.summaryValueSmall}>
              {isOnline ? "API + cache local" : "Realm local"}
            </Text>
          </View>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => loadWorkOrders(isOnline)}
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
            <TouchableOpacity activeOpacity={0.92} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>

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
              </View>

              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Técnico</Text>
                <Text style={styles.metaValue}>{item.assignedTo}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Sincronização</Text>
                <Text style={styles.metaValue}>
                  {getSyncLabel(item.syncStatus)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
}
