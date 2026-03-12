import { THEME } from "@/theme";
import { screenStyles } from "@styles/screen";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ...screenStyles,

  wrapper: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 16,
    backgroundColor: THEME.colors.background,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },

  headerContent: {
    flex: 1,
    paddingRight: 12,
  },

  statusChip: {
    minHeight: 34,
    borderRadius: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
  },

  statusChipOnline: {
    backgroundColor: THEME.colors.successLight,
    borderColor: THEME.colors.onlineBorder,
  },

  statusChipOffline: {
    backgroundColor: THEME.colors.warningLight,
    borderColor: THEME.colors.offlineBorder,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  statusDotOnline: {
    backgroundColor: THEME.colors.success,
  },

  statusDotOffline: {
    backgroundColor: THEME.colors.warning,
  },

  statusChipText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
  },

  statusChipTextOnline: {
    color: THEME.colors.success,
  },

  statusChipTextOffline: {
    color: THEME.colors.warning,
  },

  bannerWarning: {
    backgroundColor: THEME.colors.warningLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.colors.offlineBorder,
  },

  bannerWarningTitle: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: THEME.colors.warning,
    marginBottom: 4,
  },

  bannerWarningText: {
    fontFamily: THEME.fonts.body,
    fontSize: 12,
    color: THEME.colors.warning,
    lineHeight: 18,
  },

  bannerError: {
    backgroundColor: THEME.colors.dangerLight,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: THEME.colors.offlineBorder,
  },

  bannerErrorText: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: THEME.colors.danger,
  },

  listContent: {
    paddingBottom: 32,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },

  emptyTitle: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 16,
    color: THEME.colors.text,
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: THEME.colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },

  cardItem: {
    backgroundColor: THEME.colors.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E5DF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  cardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardTitle: {
    flex: 1,
    fontFamily: THEME.fonts.bold,
    fontSize: 18,
    color: THEME.colors.text,
  },

  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgePending: {
    backgroundColor: THEME.colors.warningLight,
  },

  badgeInProgress: {
    backgroundColor: THEME.colors.primaryLight,
  },

  badgeCompleted: {
    backgroundColor: THEME.colors.successLight,
  },

  badgeText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
  },

  badgeTextPending: {
    color: THEME.colors.warning,
  },

  badgeTextInProgress: {
    color: THEME.colors.primary,
  },

  badgeTextCompleted: {
    color: THEME.colors.success,
  },

  cardDescription: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },

  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDF2EF",
  },

  metaColumn: {
    flex: 1,
  },

  metaLabel: {
    fontFamily: THEME.fonts.body,
    fontSize: 12,
    color: THEME.colors.textMuted,
    marginBottom: 4,
  },

  metaValueLeft: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
    textAlign: "left",
  },

  metaValueRight: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: THEME.colors.text,
    textAlign: "right",
  },

  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FBF9",
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
});
