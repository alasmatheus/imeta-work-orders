import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { THEME } from "@/theme";
import { styles } from "./styles";

type Props = TextInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  nameLabel?: string;
  isRequired?: boolean;
  colorLabel?: string;
  colorTextInput?: string;
  borderColor?: string;
  InputRightElement?: React.ReactNode;
  height?: number;
  borderRadius?: number;
};

export function Input({
  errorMessage = null,
  nameLabel,
  isRequired = false,
  colorLabel = THEME.colors.black,
  colorTextInput = THEME.colors.black,
  InputRightElement,
  borderColor = "#DADCE0",
  height = 49,
  borderRadius = 12,
  style,
  ...rest
}: Props) {
  return (
    <View>
      {nameLabel && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colorLabel }]}>{nameLabel}</Text>
          {isRequired && <Text style={styles.requiredText}>*</Text>}
        </View>
      )}

      <View>
        <TextInput
          style={[
            styles.input,
            {
              height,
              borderRadius,
              borderColor,
              color: colorTextInput,
            },
            style,
          ]}
          placeholderTextColor="gray"
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
