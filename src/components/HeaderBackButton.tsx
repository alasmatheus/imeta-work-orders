import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "@theme/index";
import { Platform, TouchableOpacity } from "react-native";

export function HeaderBackButton() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <TouchableOpacity
      style={{ marginLeft: 10, marginTop: Platform.OS === "android" ? 6 : 0 }}
      onPress={handleGoBack}
    >
      <Ionicons name="chevron-back" size={24} color={THEME.colors.black} />
    </TouchableOpacity>
  );
}
