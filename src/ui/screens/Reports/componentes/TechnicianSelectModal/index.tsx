import { ScrollView, Text, TouchableOpacity } from "react-native";

import { AppModal } from "@/components/Modal";
import { styles } from "./styles";

type TechnicianSelectModalProps = {
  visible: boolean;
  technicians: string[];
  selectedTechnician: string;
  onClose: () => void;
  onSelect: (technician: string) => void;
};

export function TechnicianSelectModal({
  visible,
  technicians,
  selectedTechnician,
  onClose,
  onSelect,
}: TechnicianSelectModalProps) {
  return (
    <AppModal visible={visible} onClose={onClose} title="Selecionar técnico">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {technicians.map((technician) => {
          const selected = selectedTechnician === technician;

          return (
            <TouchableOpacity
              key={technician}
              activeOpacity={0.88}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => {
                onSelect(technician);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {technician === "all" ? "Todos" : technician}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </AppModal>
  );
}
