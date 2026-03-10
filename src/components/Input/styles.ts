import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  label: {
    fontSize: THEME.fontSizes.xs,
    fontFamily: THEME.fonts.semiBold,
  },

  requiredText: {
    fontSize: 18,
    color: "red",
    marginLeft: 4,
    lineHeight: 18,
  },

  input: {
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 14,
    fontFamily: THEME.fonts.body,
    backgroundColor: THEME.colors.white,
  },

  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },

  iconContainer: {
    position: "absolute",
    top: 0,
    right: 16,
    bottom: 0,
    justifyContent: "center",
  },
});
