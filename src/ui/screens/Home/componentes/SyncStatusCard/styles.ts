import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 10,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  content: {
    flex: 1,
  },

  label: {
    fontFamily: THEME.fonts.body,
    fontSize: 11,
    color: THEME.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  value: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 15,
    color: THEME.colors.text,
  },

  syncingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 2,
  },

  syncingText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
    color: THEME.colors.primary,
  },

  infoRow: {
    gap: 2,
  },

  infoLabel: {
    fontFamily: THEME.fonts.body,
    fontSize: 11,
    color: THEME.colors.textMuted,
  },

  infoValue: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: THEME.colors.text,
  },

  errorBox: {
    backgroundColor: THEME.colors.dangerLight,
    borderWidth: 1,
    borderColor: THEME.colors.offlineBorder,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  errorText: {
    fontFamily: THEME.fonts.body,
    fontSize: 12,
    color: THEME.colors.danger,
  },

  buttonWrapper: {
    marginTop: 2,
  },
});
