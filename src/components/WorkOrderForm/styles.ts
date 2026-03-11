import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  spacer: {
    height: 16,
  },

  multilineInput: {
    paddingTop: 14,
  },

  statusLabel: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: THEME.colors.text,
    marginBottom: 10,
  },

  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  statusButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.card,
  },

  statusButtonSelected: {
    borderWidth: 1,
  },

  statusButtonSelectedPending: {
    backgroundColor: THEME.colors.warningLight,
    borderColor: THEME.colors.offlineBorder,
  },

  statusButtonSelectedInProgress: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.onlineBorder,
  },

  statusButtonSelectedCompleted: {
    backgroundColor: THEME.colors.successLight,
    borderColor: THEME.colors.onlineBorder,
  },

  statusButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: THEME.colors.textMuted,
  },

  statusButtonTextSelected: {},

  statusButtonTextSelectedPending: {
    color: THEME.colors.warning,
  },

  statusButtonTextSelectedInProgress: {
    color: THEME.colors.primary,
  },

  statusButtonTextSelectedCompleted: {
    color: THEME.colors.success,
  },

  footer: {
    marginTop: 24,
  },
});
