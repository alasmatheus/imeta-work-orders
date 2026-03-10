import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: "#F8F9FA",
  },

  header: {
    marginBottom: 20,
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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ECEFF1",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  spacer: {
    height: 16,
  },

  statusLabel: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: "#202124",
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
    borderColor: "#DADCE0",
    backgroundColor: "#FFFFFF",
  },

  statusButtonSelected: {
    backgroundColor: "#E8F0FE",
    borderColor: "#AECBFA",
  },

  statusButtonText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 13,
    color: "#5F6368",
  },

  statusButtonTextSelected: {
    color: "#1967D2",
  },

  footer: {
    marginTop: 24,
  },
});
