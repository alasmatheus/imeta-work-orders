import { THEME } from "@/theme";
import { screenStyles } from "@styles/screen";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ...screenStyles,

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

  infoCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
  },

  infoCardOnline: {
    backgroundColor: THEME.colors.primaryLight,
    borderColor: THEME.colors.onlineBorder,
  },

  infoCardOffline: {
    backgroundColor: THEME.colors.warningLight,
    borderColor: THEME.colors.offlineBorder,
  },

  infoTitle: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    marginBottom: 4,
  },

  infoTitleOnline: {
    color: THEME.colors.primary,
  },

  infoTitleOffline: {
    color: THEME.colors.warning,
  },

  infoText: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    lineHeight: 19,
  },

  infoTextOnline: {
    color: THEME.colors.primaryDark,
  },

  infoTextOffline: {
    color: THEME.colors.warning,
  },

  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
});
