import { THEME } from "@/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
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
