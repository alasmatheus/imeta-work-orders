import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { Container } from "@/components/Container";
import { WorkOrderForm } from "@/components/WorkOrderForm";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { styles } from "./styles";

export function Edit() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { id } = route.params;

  const items = useWorkOrdersStore((state) => state.items);
  const updateLocal = useWorkOrdersStore((state) => state.updateLocal);

  const order = items.find((item) => item.id === id);

  const [title, setTitle] = useState(order?.title || "");
  const [description, setDescription] = useState(order?.description || "");
  const [assignedTo, setAssignedTo] = useState(order?.assignedTo || "");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">(
    (order?.status as "Pending" | "In Progress" | "Completed") || "Pending",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSave() {
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
    <Container backgroundColor="#F8F9FA">
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>FIELDSYNC</Text>
          <Text style={styles.title}>Editar ordem</Text>
          <Text style={styles.subtitle}>
            Atualize os dados da ordem de serviço localmente.
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
