import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Platform, TouchableOpacity } from "react-native";

import { THEME } from "@/theme";
import { styles } from "./styles";

export function HeaderBackButton() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, Platform.OS === "android" && styles.buttonAndroid]}
      onPress={handleGoBack}
    >
      <Ionicons name="chevron-back" size={24} color={THEME.colors.black} />
    </TouchableOpacity>
  );
}
