import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
  },

  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  eyebrow: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
    color: "#5F6368",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },

  title: {
    fontFamily: THEME.fonts.bold,
    fontSize: 28,
    color: "#202124",
    marginBottom: 6,
  },

  subtitle: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: "#5F6368",
    lineHeight: 20,
  },

  statusChip: {
    minHeight: 36,
    borderRadius: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
  },

  statusChipOnline: {
    backgroundColor: "#E6F4EA",
    borderColor: "#CEEAD6",
  },

  statusChipOffline: {
    backgroundColor: "#FCE8E6",
    borderColor: "#F6C7C3",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  statusDotOnline: {
    backgroundColor: "#188038",
  },

  statusDotOffline: {
    backgroundColor: "#D93025",
  },

  statusChipText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
  },

  statusChipTextOnline: {
    color: "#188038",
  },

  statusChipTextOffline: {
    color: "#D93025",
  },

  bannerWarning: {
    backgroundColor: "#FFF4E5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FAD7A0",
  },

  bannerWarningTitle: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: "#B06000",
    marginBottom: 4,
  },

  bannerWarningText: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: "#8A4B00",
    lineHeight: 19,
  },

  bannerError: {
    backgroundColor: "#FCE8E6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F4C7C3",
  },

  bannerErrorText: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: "#B3261E",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECEFF1",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  summaryBlock: {
    flex: 1,
  },

  summaryLabel: {
    fontFamily: THEME.fonts.body,
    fontSize: 12,
    color: "#5F6368",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  summaryValue: {
    fontFamily: THEME.fonts.bold,
    fontSize: 24,
    color: "#202124",
  },

  summaryValueSmall: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: "#202124",
  },

  summaryDivider: {
    width: 1,
    height: 44,
    backgroundColor: "#ECEFF1",
    marginHorizontal: 16,
  },

  listContent: {
    paddingBottom: 32,
  },

  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECEFF1",
  },

  emptyTitle: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 16,
    color: "#202124",
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: "#5F6368",
    textAlign: "center",
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ECEFF1",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },

  cardTitle: {
    flex: 1,
    fontFamily: THEME.fonts.semiBold,
    fontSize: 16,
    color: "#202124",
  },

  cardDescription: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: "#5F6368",
    lineHeight: 20,
    marginBottom: 14,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },

  metaLabel: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: "#5F6368",
  },

  metaValue: {
    flex: 1,
    textAlign: "right",
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: "#202124",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgePending: {
    backgroundColor: "#FEF7E0",
  },

  badgeInProgress: {
    backgroundColor: "#E8F0FE",
  },

  badgeCompleted: {
    backgroundColor: "#E6F4EA",
  },

  badgeText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
  },

  badgeTextPending: {
    color: "#B06000",
  },

  badgeTextInProgress: {
    color: "#1967D2",
  },

  badgeTextCompleted: {
    color: "#188038",
  },
});
