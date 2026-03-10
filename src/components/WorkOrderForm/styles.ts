import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
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
