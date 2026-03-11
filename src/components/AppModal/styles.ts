import { StyleSheet } from "react-native";

import { THEME } from "@/theme";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: THEME.colors.overlay,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    maxHeight: "80%",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },

  title: {
    flex: 1,
    fontFamily: THEME.fonts.bold,
    fontSize: 18,
    color: THEME.colors.text,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.background,
  },
});
