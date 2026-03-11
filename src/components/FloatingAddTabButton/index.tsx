import { Feather } from "@expo/vector-icons";
import {
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { THEME } from "@/theme";
import { styles } from "./styles";

type FloatingAddTabButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
};

export function FloatingAddTabButton({ onPress }: FloatingAddTabButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.button}>
          <Feather name="plus" size={28} color={THEME.colors.white} />
        </View>

        <Text style={styles.label}>Add</Text>
      </View>
    </TouchableOpacity>
  );
}
