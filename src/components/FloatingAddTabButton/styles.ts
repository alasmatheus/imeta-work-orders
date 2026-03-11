import { Platform, StyleSheet } from "react-native";

import { THEME } from "@/theme";

export const styles = StyleSheet.create({
  wrapper: {
    top: Platform.OS === "ios" ? -20 : -24,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: THEME.colors.background,
    shadowColor: THEME.colors.black,
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  label: {
    marginTop: 2,
    fontSize: 11,
    fontFamily: THEME.fonts.semiBold,
    color: THEME.colors.text,
  },
});
