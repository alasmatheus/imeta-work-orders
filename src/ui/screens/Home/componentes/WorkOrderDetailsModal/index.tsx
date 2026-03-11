import { Text, TouchableOpacity, View } from "react-native";

import { AppModal } from "@/components/AppModal";
import { formatDateTime } from "@/utils/date";
import { styles } from "./styles";

type WorkOrderDetailsModalProps = {
  visible: boolean;
  item: any | null;
  onClose: () => void;
  onEdit: (itemId: string) => void;
  getStatusLabel: (status: string) => string;
  getSyncLabel: (syncStatus: string) => string;
};

export function WorkOrderDetailsModal({
  visible,
  item,
  onClose,
  onEdit,
  getStatusLabel,
  getSyncLabel,
}: WorkOrderDetailsModalProps) {
  return (
    <AppModal visible={visible} onClose={onClose} title="Detalhes da ordem">
      {item && (
        <>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Título</Text>
            <Text style={styles.detailValue}>{item.title}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Descrição</Text>
            <Text style={styles.detailValue}>{item.description}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.detailValue}>
              {getStatusLabel(item.status)}
            </Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Técnico</Text>
            <Text style={styles.detailValue}>{item.assignedTo}</Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Criada em</Text>
            <Text style={styles.detailValue}>
              {formatDateTime(item.createdAt)}
            </Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Atualizada em</Text>
            <Text style={styles.detailValue}>
              {formatDateTime(item.updatedAt)}
            </Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Sincronização</Text>
            <Text style={styles.detailValue}>
              {getSyncLabel(item.syncStatus)}
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={onClose}
            >
              <Text style={styles.secondaryButtonText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => onEdit(item.id)}
            >
              <Text style={styles.primaryButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </AppModal>
  );
}
