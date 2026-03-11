import { THEME } from "@/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  buttonText: {
    fontFamily: THEME.fonts.bold,
    fontSize: THEME.fontSizes.md,
  },
});
