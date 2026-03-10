import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { AppNavigatorRoutesProps } from "@/routes/appBottom.routes";
import { useWorkOrdersStore } from "@/stores/workOrders.store";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"] as const;

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
    <Container backgroundColor="#F8F9FA">
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>FIELDSYNC</Text>
          <Text style={styles.title}>Nova ordem de serviço</Text>
          <Text style={styles.subtitle}>
            Cadastre uma nova ordem para uso local e sincronização futura.
          </Text>
        </View>

        <View style={styles.card}>
          <Input
            nameLabel="Título"
            isRequired
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Reconexão de cabos do switch"
            colorLabel="black"
            colorTextInput="black"
          />

          <View style={styles.spacer} />

          <Input
            nameLabel="Descrição"
            isRequired
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva o serviço a ser realizado"
            colorLabel="black"
            colorTextInput="black"
            multiline
            height={120}
          />

          <View style={styles.spacer} />

          <Input
            nameLabel="Técnico responsável"
            isRequired
            value={assignedTo}
            onChangeText={setAssignedTo}
            placeholder="Ex: Luiz Alberto"
            colorLabel="black"
            colorTextInput="black"
          />

          <View style={styles.spacer} />

          <Text style={styles.statusLabel}>Status</Text>

          <View style={styles.statusContainer}>
            {STATUS_OPTIONS.map((option) => {
              const selected = status === option;

              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.85}
                  style={[
                    styles.statusButton,
                    selected && styles.statusButtonSelected,
                  ]}
                  onPress={() => setStatus(option)}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      selected && styles.statusButtonTextSelected,
                    ]}
                  >
                    {option === "Pending"
                      ? "Pendente"
                      : option === "In Progress"
                        ? "Em andamento"
                        : "Concluída"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footer}>
            <Button
              title="Criar ordem"
              onPress={handleSubmit}
              isLoading={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
