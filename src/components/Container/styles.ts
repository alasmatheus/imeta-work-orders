import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  loadingOverlay: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: THEME.colors.transparent78,
  },

  loadingInner: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: THEME.colors.card,
    minWidth: 150,
    alignItems: "center",
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },

  loadingText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 14,
    color: THEME.colors.text,
  },
});
