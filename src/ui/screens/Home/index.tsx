import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Container } from "@/components/Container";
import { useSyncStore } from "@/stores/sync.store";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
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
  const navigation = useNavigation<any>();
  const isOnline = useSyncStore((state) => state.isOnline);

  const items = useWorkOrdersStore((state) => state.items);
  const loading = useWorkOrdersStore((state) => state.loading);
  const error = useWorkOrdersStore((state) => state.error);
  const loadWorkOrders = useWorkOrdersStore((state) => state.loadWorkOrders);
  const softDeleteLocal = useWorkOrdersStore((state) => state.softDeleteLocal);

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    loadWorkOrders(isOnline);
  }, [isOnline, loadWorkOrders]);

  function handleOpenDetails(item: any) {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  }

  function handleCloseDetails() {
    setSelectedItem(null);
    setIsDetailsModalOpen(false);
  }

  async function handleRemove(item: any) {
    Alert.alert("Remover ordem", `Deseja remover a ordem "${item.title}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => deleteLocal(item.id),
      },
    ]);
  }

  async function deleteLocal(item: string) {
    await softDeleteLocal(item);
  }

  return (
    <Container loading={loading} backgroundColor="#F8F9FA">
      <View style={styles.wrapper}>
        <View style={[styles.header, styles.headerRow]}>
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
            <TouchableOpacity
              activeOpacity={0.92}
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
                    <Feather name="edit-2" size={18} color="#1967D2" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconButton}
                    activeOpacity={0.8}
                    onPress={() => handleRemove(item)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={20}
                      color="#D93025"
                    />
                  </TouchableOpacity>
                </View>
              </View>

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

      <Modal
        visible={isDetailsModalOpen}
        transparent
        animationType="fade"
        onRequestClose={handleCloseDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes da ordem</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.modalCloseButton}
                onPress={handleCloseDetails}
              >
                <Feather name="x" size={20} color="#202124" />
              </TouchableOpacity>
            </View>

            {selectedItem && (
              <>
                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Título</Text>
                  <Text style={styles.detailValue}>{selectedItem.title}</Text>
                </View>

                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Descrição</Text>
                  <Text style={styles.detailValue}>
                    {selectedItem.description}
                  </Text>
                </View>

                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <Text style={styles.detailValue}>
                    {getStatusLabel(selectedItem.status)}
                  </Text>
                </View>

                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Técnico</Text>
                  <Text style={styles.detailValue}>
                    {selectedItem.assignedTo}
                  </Text>
                </View>

                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Criada em</Text>
                  <Text style={styles.detailValue}>
                    {selectedItem.createdAt}
                  </Text>
                </View>

                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Atualizada em</Text>
                  <Text style={styles.detailValue}>
                    {selectedItem.updatedAt}
                  </Text>
                </View>

                <View style={styles.detailBlock}>
                  <Text style={styles.detailLabel}>Sincronização</Text>
                  <Text style={styles.detailValue}>
                    {getSyncLabel(selectedItem.syncStatus)}
                  </Text>
                </View>

                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.modalSecondaryButton}
                    activeOpacity={0.85}
                    onPress={handleCloseDetails}
                  >
                    <Text style={styles.modalSecondaryButtonText}>Fechar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalPrimaryButton}
                    activeOpacity={0.85}
                    onPress={() => {
                      handleCloseDetails();
                      navigation.navigate("edit", { id: selectedItem.id });
                    }}
                  >
                    <Text style={styles.modalPrimaryButtonText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </Container>
  );
}
