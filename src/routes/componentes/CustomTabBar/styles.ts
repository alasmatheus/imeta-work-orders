import { Platform, StyleSheet } from "react-native";

import { THEME } from "@/theme";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
  },

  container: {
    height: Platform.OS === "ios" ? 90 : 78,
    paddingBottom: Platform.OS === "ios" ? 18 : 10,
    paddingTop: 8,
    backgroundColor: THEME.colors.card,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    shadowColor: THEME.colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },

  sideItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },

  centerButtonWrapper: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontFamily: THEME.fonts.body,
    color: THEME.colors.textMuted,
  },

  labelActive: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.semiBold,
  },
});
