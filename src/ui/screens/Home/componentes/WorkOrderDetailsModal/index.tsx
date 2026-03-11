import { Feather } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Detalhes da ordem</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalCloseButton}
              onPress={onClose}
            >
              <Feather name="x" size={20} color="#16352B" />
            </TouchableOpacity>
          </View>

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

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalSecondaryButton}
                  activeOpacity={0.85}
                  onPress={onClose}
                >
                  <Text style={styles.modalSecondaryButtonText}>Fechar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalPrimaryButton}
                  activeOpacity={0.85}
                  onPress={() => onEdit(item.id)}
                >
                  <Text style={styles.modalPrimaryButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
