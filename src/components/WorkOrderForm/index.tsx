import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"] as const;

type Props = {
  title: string;
  description: string;
  assignedTo: string;
  status: "Pending" | "In Progress" | "Completed";
  isSubmitting?: boolean;
  submitLabel?: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeAssignedTo: (value: string) => void;
  onChangeStatus: (value: "Pending" | "In Progress" | "Completed") => void;
  onSubmit: () => void;
};

export function WorkOrderForm({
  title,
  description,
  assignedTo,
  status,
  isSubmitting = false,
  submitLabel = "Salvar",
  onChangeTitle,
  onChangeDescription,
  onChangeAssignedTo,
  onChangeStatus,
  onSubmit,
}: Props) {
  return (
    <View style={styles.container}>
      <Input
        nameLabel="Título"
        isRequired
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Ex: Reconexão de cabos do switch"
        colorLabel="black"
        colorTextInput="black"
      />

      <View style={styles.spacer} />

      <Input
        nameLabel="Descrição"
        isRequired
        value={description}
        onChangeText={onChangeDescription}
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
        onChangeText={onChangeAssignedTo}
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
              onPress={() => onChangeStatus(option)}
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
          title={submitLabel}
          onPress={onSubmit}
          isLoading={isSubmitting}
        />
      </View>
    </View>
  );
}
