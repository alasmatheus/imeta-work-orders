import { StyleSheet } from "react-native";

import { THEME } from "@/theme";

export const styles = StyleSheet.create({
  detailBlock: {
    marginBottom: 14,
  },

  detailLabel: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  detailValue: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: THEME.colors.text,
    lineHeight: 20,
  },

  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  secondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
    borderColor: THEME.colors.divider,
  },

  secondaryButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
  },

  primaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.primary,
  },

  primaryButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.white,
  },
});
