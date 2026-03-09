import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { THEME } from "@theme/index";

type Props = {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  widthButton?: any;
};

export function Button({
  title,
  onPress,
  isLoading,
  disabled,
  bgColor,
  textColor,
  widthButton,
  ...rest
}: Props) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: bgColor ? bgColor : THEME.colors.green800,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: 46,
      width: widthButton ? widthButton : "100%",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.7 : 1,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    buttonText: {
      color: textColor ? textColor : "white",
      fontFamily: THEME.fonts.bold,
      fontSize: THEME.fontSizes.md,
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={THEME.colors.primary} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
