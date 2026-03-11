import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { Container } from "@/components/Container";
import { WorkOrderForm } from "@/components/WorkOrderForm";
import { useSyncStore } from "@/stores/sync.store";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { THEME } from "@/theme";
import { styles } from "./styles";

export function Edit() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;

  const isOnline = useSyncStore((state) => state.isOnline);

  const loading = useWorkOrdersStore((state) => state.loading);
  const loadWorkOrderById = useWorkOrdersStore(
    (state) => state.loadWorkOrderById,
  );
  const updateLocal = useWorkOrdersStore((state) => state.updateLocal);
  const clearSelectedItem = useWorkOrdersStore(
    (state) => state.clearSelectedItem,
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">(
    "Pending",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      const item = await loadWorkOrderById(id, isOnline);

      if (!item) {
        Alert.alert("Erro", "Não foi possível carregar a ordem de serviço.");
        navigation.goBack();
        return;
      }

      setTitle(item.title);
      setDescription(item.description);
      setAssignedTo(item.assignedTo);
      setStatus(item.status as "Pending" | "In Progress" | "Completed");
    }

    loadData();

    return () => {
      clearSelectedItem();
    };
  }, [id, isOnline, loadWorkOrderById, clearSelectedItem, navigation]);

  async function handleSave() {
    if (!title.trim() || !description.trim() || !assignedTo.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateLocal(id, {
        title: title.trim(),
        description: description.trim(),
        assignedTo: assignedTo.trim(),
        status,
      });

      Alert.alert("Sucesso", "Ordem de serviço atualizada com sucesso.");
      navigation.goBack();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar a ordem de serviço.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container loading={loading} backgroundColor={THEME.colors.background}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INMETA</Text>
          <Text style={styles.title}>Editar ordem</Text>
          <Text style={styles.subtitle}>
            Atualize os dados da ordem armazenada localmente.
          </Text>
        </View>

        <View
          style={[
            styles.infoCard,
            isOnline ? styles.infoCardOnline : styles.infoCardOffline,
          ]}
        >
          <Text
            style={[
              styles.infoTitle,
              isOnline ? styles.infoTitleOnline : styles.infoTitleOffline,
            ]}
          >
            {isOnline ? "Modo online" : "Modo offline"}
          </Text>

          <Text
            style={[
              styles.infoText,
              isOnline ? styles.infoTextOnline : styles.infoTextOffline,
            ]}
          >
            {isOnline
              ? "Os dados foram carregados do fluxo sincronizado e as alterações serão salvas localmente antes do próximo sync."
              : "Os dados foram carregados do armazenamento local e continuarão disponíveis mesmo sem conexão."}
          </Text>
        </View>

        <View style={styles.card}>
          <WorkOrderForm
            title={title}
            description={description}
            assignedTo={assignedTo}
            status={status}
            isSubmitting={isSubmitting}
            submitLabel="Salvar alterações"
            onChangeTitle={setTitle}
            onChangeDescription={setDescription}
            onChangeAssignedTo={setAssignedTo}
            onChangeStatus={setStatus}
            onSubmit={handleSave}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
