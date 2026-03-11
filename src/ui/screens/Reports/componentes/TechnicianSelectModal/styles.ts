import { StyleSheet } from "react-native";

import { THEME } from "@/theme";

export const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 4,
  },

  option: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 10,
  },

  optionSelected: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.onlineBorder,
  },

  optionText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
  },

  optionTextSelected: {
    color: THEME.colors.primary,
  },
});
