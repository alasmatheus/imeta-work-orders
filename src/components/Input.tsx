import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { THEME } from "@theme/index";

type Props = TextInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  showIconPass?: boolean;
  nameLabel?: string;
  sizeLabel?: string;
  isRequired?: boolean;
  colorLabel?: string;
  colorTextInput?: string;
  borderColor?: string;
  InputRightElement?: any;
  height?: number;
  borderRadius?: number;
};

export function Input({
  errorMessage = null,
  isInvalid,
  showIconPass,
  nameLabel,
  isRequired = false,
  colorLabel = "white",
  colorTextInput = "white",
  sizeLabel,
  InputRightElement,
  borderColor = THEME.colors.borderInput,
  height = 49,
  borderRadius = 12,
  ...rest
}: Props) {
  const styles = StyleSheet.create({
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 3,
    },
    label: {
      fontSize: THEME.fontSizes.xs,
      color: colorLabel,
      fontFamily: THEME.fonts.semiBold,
      marginLeft: 0,
    },
    requiredText: {
      fontSize: 22,
      color: "red",
      marginLeft: 2,
    },

    input: {
      height: height,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: borderRadius,
      fontSize: 14,
      color: "black",
      fontFamily: THEME.fonts.body,
      backgroundColor: "white",
    },
    errorText: {
      color: "red",
    },
    iconContainer: {
      position: "absolute",
      top: 0,
      right: 16,
      bottom: 0,
      justifyContent: "center",
    },
  });
  return (
    <View>
      {nameLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{nameLabel}</Text>
          <Text style={styles.requiredText}>{isRequired ? "*" : null}</Text>
        </View>
      )}

      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor={"gray"}
          {...rest}
        />
        {InputRightElement && (
          <View style={styles.iconContainer}>{InputRightElement}</View>
        )}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}
