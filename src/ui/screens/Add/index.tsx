import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { Container } from "@/components/Container";
import { WorkOrderForm } from "@/components/WorkOrderForm";
import { AppNavigatorRoutesProps } from "@/routes/appBottom.routes";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { THEME } from "@/theme";
import { styles } from "./styles";

export function Add() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const createLocal = useWorkOrdersStore((state) => state.createLocal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState<"Pending" | "In Progress" | "Completed">(
    "Pending",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    if (!title.trim()) {
      Alert.alert("Atenção", "Informe o título da ordem de serviço.");
      return false;
    }

    if (!description.trim()) {
      Alert.alert("Atenção", "Informe a descrição da ordem de serviço.");
      return false;
    }

    if (!assignedTo.trim()) {
      Alert.alert("Atenção", "Informe o nome do técnico responsável.");
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      await createLocal({
        title: title.trim(),
        description: description.trim(),
        assignedTo: assignedTo.trim(),
        status,
      });

      Alert.alert("Sucesso", "Ordem de serviço criada com sucesso.");

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setStatus("Pending");

      navigation.navigate("home");
    } catch {
      Alert.alert("Erro", "Não foi possível criar a ordem de serviço.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container backgroundColor={THEME.colors.background}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INMETA</Text>
          <Text style={styles.title}>Nova ordem de serviço</Text>
          <Text style={styles.subtitle}>
            Cadastre uma nova ordem para armazenamento local no Realm e
            sincronização futura.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Criação local</Text>
          <Text style={styles.infoText}>
            Esta ordem será salva imediatamente no dispositivo e poderá ser
            sincronizada quando houver conexão.
          </Text>
        </View>

        <View style={styles.card}>
          <WorkOrderForm
            title={title}
            description={description}
            assignedTo={assignedTo}
            status={status}
            isSubmitting={isSubmitting}
            submitLabel="Criar ordem"
            onChangeTitle={setTitle}
            onChangeDescription={setDescription}
            onChangeAssignedTo={setAssignedTo}
            onChangeStatus={setStatus}
            onSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
