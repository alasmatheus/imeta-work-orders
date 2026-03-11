import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const screenStyles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: THEME.colors.background,
  },

  header: {
    marginBottom: 20,
  },

  eyebrow: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 12,
    color: THEME.colors.gray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },

  title: {
    fontFamily: THEME.fonts.bold,
    fontSize: 28,
    color: THEME.colors.text,
    marginBottom: 6,
  },

  subtitle: {
    fontFamily: THEME.fonts.body,
    fontSize: 14,
    color: THEME.colors.text,
    lineHeight: 20,
  },

  card: {
    backgroundColor: THEME.colors.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    shadowColor: THEME.colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
});
