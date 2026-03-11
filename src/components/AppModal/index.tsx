import { Feather } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { THEME } from "@/theme";
import { styles } from "./styles";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
};

export function AppModal({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              <Text style={styles.title}>{title ?? ""}</Text>

              {showCloseButton ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <Feather name="x" size={20} color={THEME.colors.text} />
                </TouchableOpacity>
              ) : null}
            </View>
          )}

          {children}
        </View>
      </View>
    </Modal>
  );
}
