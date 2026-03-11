import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: THEME.colors.background,
  },

  header: {
    marginBottom: 14,
  },

  eyebrow: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.6,
  },

  title: {
    fontFamily: THEME.fonts.bold,
    fontSize: 28,
    color: THEME.colors.text,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: THEME.colors.textMuted,
    lineHeight: 20,
  },

  summaryCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryItem: {
    flex: 1,
  },

  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: THEME.colors.divider,
    marginHorizontal: 16,
  },

  summaryLabel: {
    fontFamily: THEME.fonts.body,
    fontSize: 12,
    color: THEME.colors.textMuted,
    marginBottom: 4,
  },

  summaryValue: {
    fontFamily: THEME.fonts.bold,
    fontSize: 22,
    color: THEME.colors.text,
  },

  filtersCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },

  chartCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: "center",
  },

  metricsCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },

  cardTitle: {
    fontFamily: THEME.fonts.bold,
    fontSize: 18,
    color: THEME.colors.text,
    marginBottom: 14,
  },

  filterLabel: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: THEME.colors.text,
    marginBottom: 10,
    marginTop: 4,
  },

  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },

  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.background,
  },

  chipSelected: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.onlineBorder,
  },

  chipText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: THEME.colors.textMuted,
  },

  chipTextSelected: {
    color: THEME.colors.primary,
  },

  emptyChart: {
    width: "100%",
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyChartText: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: THEME.colors.textMuted,
    textAlign: "center",
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },

  metricLabel: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: THEME.colors.text,
  },

  metricValue: {
    fontFamily: THEME.fonts.bold,
    fontSize: 16,
    color: THEME.colors.primary,
  },
  selectButton: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.background,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  selectButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: THEME.colors.overlay,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    maxHeight: "70%",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },

  modalTitle: {
    flex: 1,
    fontFamily: THEME.fonts.bold,
    fontSize: 18,
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

  modalListContent: {
    paddingBottom: 4,
  },

  modalOption: {
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

  modalOptionSelected: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.onlineBorder,
  },

  modalOptionText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
  },

  modalOptionTextSelected: {
    color: THEME.colors.primary,
  },
});
