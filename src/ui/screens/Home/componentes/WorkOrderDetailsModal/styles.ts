import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: THEME.colors.overlay,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 12,
  },

  modalTitle: {
    flex: 1,
    fontFamily: THEME.fonts.bold,
    fontSize: 20,
    color: THEME.colors.text,
  },

  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.background,
  },

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

  modalFooter: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  modalSecondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
    borderColor: THEME.colors.divider,
  },

  modalSecondaryButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
  },

  modalPrimaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.primary,
  },

  modalPrimaryButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.white,
  },
});
