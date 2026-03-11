import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

import { THEME } from "@/theme";
import { FloatingAddTabButton } from "../FloatingAddTabButton/index";
import { styles } from "./styles";

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const goTo = (routeName: string) => {
    navigation.navigate(routeName as never);
  };

  const isHomeFocused = state.routes[state.index].name === "home";
  const isReportFocused = state.routes[state.index].name === "report";

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.sideItem}
          onPress={() => goTo("home")}
        >
          <FontAwesome
            name="home"
            size={22}
            color={
              isHomeFocused ? THEME.colors.primary : THEME.colors.textMuted
            }
          />
          <Text style={[styles.label, isHomeFocused && styles.labelActive]}>
            Início
          </Text>
        </TouchableOpacity>

        <View style={styles.centerButtonWrapper}>
          <FloatingAddTabButton onPress={() => goTo("add")} />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.sideItem}
          onPress={() => goTo("report")}
        >
          <Ionicons
            name="bar-chart"
            size={22}
            color={
              isReportFocused ? THEME.colors.primary : THEME.colors.textMuted
            }
          />
          <Text style={[styles.label, isReportFocused && styles.labelActive]}>
            Relatórios
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
