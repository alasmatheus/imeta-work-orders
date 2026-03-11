import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  label: {
    fontSize: 12,
    fontFamily: THEME.fonts.semiBold,
  },

  requiredText: {
    fontSize: 16,
    color: THEME.colors.warning,
    marginLeft: 4,
    lineHeight: 16,
  },

  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    fontSize: 14,
    fontFamily: THEME.fonts.body,
    backgroundColor: THEME.colors.white,
  },

  errorText: {
    color: THEME.colors.danger,
    marginTop: 5,
    fontSize: 12,
    fontFamily: THEME.fonts.body,
  },

  iconContainer: {
    position: "absolute",
    top: 0,
    right: 16,
    bottom: 0,
    justifyContent: "center",
  },
});
