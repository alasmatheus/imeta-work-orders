import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { THEME } from "@/theme";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  bgColor?: string;
  textColor?: string;
  widthButton?: number | string;
};

export function Button({
  title,
  isLoading = false,
  disabled = false,
  bgColor,
  textColor,
  widthButton = "100%",
  style,
  ...rest
}: Props) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[
        styles.button,
        {
          backgroundColor: bgColor ?? THEME.colors.primary,
          width: widthButton,
          opacity: isDisabled ? 0.65 : 1,
        },
        style,
      ]}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor ?? THEME.colors.white} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor ?? THEME.colors.white,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
