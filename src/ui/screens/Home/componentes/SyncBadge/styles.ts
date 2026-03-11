import { THEME } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  badgeSynced: {
    backgroundColor: THEME.colors.successLight,
  },

  badgePending: {
    backgroundColor: THEME.colors.warningLight,
  },

  badgeError: {
    backgroundColor: THEME.colors.dangerLight,
  },

  badgeText: {
    fontFamily: THEME.fonts.semiBold,
    fontSize: 11,
  },

  badgeTextSynced: {
    color: THEME.colors.success,
  },

  badgeTextPending: {
    color: THEME.colors.warning,
  },

  badgeTextError: {
    color: THEME.colors.danger,
  },
});
