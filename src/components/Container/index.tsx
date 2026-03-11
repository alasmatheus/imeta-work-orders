import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";

import { styles } from "./styles";

export interface ContainerProps extends ViewProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  enableKeyboardDismissHandler?: boolean;
  avoidKeyboard?: boolean;
  keyboardAvoidingBehavior?: "height" | "position" | "padding";
  keyboardVerticalOffset?: number;
  loading?: boolean;
  loadingMessage?: string;
  loadingVariant?: "normal" | "save" | "progressBar";
  edges?: any;
}

export function Container({
  backgroundColor,
  children,
  enableKeyboardDismissHandler = false,
  avoidKeyboard = false,
  keyboardAvoidingBehavior = Platform.OS === "ios" ? "padding" : "height",
  keyboardVerticalOffset,
  loading = false,
  loadingMessage = "Carregando...",
  style,
  ...rest
}: ContainerProps) {
  const kavOffset =
    keyboardVerticalOffset !== undefined ? keyboardVerticalOffset : 0;

  const content = enableKeyboardDismissHandler ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.flex}>{children}</View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.flex}>{children}</View>
  );

  const Inner = avoidKeyboard ? KeyboardAvoidingView : View;

  return (
    <>
      <Inner
        style={[styles.flex, { backgroundColor }, style]}
        {...(avoidKeyboard
          ? {
              behavior: keyboardAvoidingBehavior,
              keyboardVerticalOffset: kavOffset,
            }
          : {})}
        {...rest}
      >
        {content}
      </Inner>

      {loading && (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <View style={styles.loadingInner}>
            <Text style={styles.loadingText}>{loadingMessage}</Text>
          </View>
        </View>
      )}
    </>
  );
}
