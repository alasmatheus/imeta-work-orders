// src/components/Container.tsx
import { THEME } from "@theme/index";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";

export interface ContainerProps extends ViewProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  enableKeyboardDismissHandler?: boolean;
  /** se true, envolve o conteúdo em KeyboardAvoidingView */
  avoidKeyboard?: boolean;
  keyboardAvoidingBehavior?: "height" | "position" | "padding";
  keyboardVerticalOffset?: number;
  loading?: boolean;
  loadingMessage?: string;
  loadingVariant?: "normal" | "save" | "progressBar";
  // edges existia, mas agora é ignorado (pra não quebrar telas antigas)
  edges?: any;
}

export const Container: React.FC<ContainerProps> = ({
  backgroundColor = "#FFFFFF",
  children,
  enableKeyboardDismissHandler = false,
  avoidKeyboard = false,
  keyboardAvoidingBehavior = Platform.OS === "ios" ? "padding" : "height",
  keyboardVerticalOffset,
  loading = false,
  loadingMessage,
  loadingVariant = "normal",
  style,
  ...rest
}: ContainerProps) => {
  // offset padrão do teclado (bem neutro agora, quem quiser pode passar via prop)
  const kavOffset =
    keyboardVerticalOffset !== undefined
      ? keyboardVerticalOffset
      : Platform.OS === "ios"
        ? 0
        : 0;

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
            <Text>Carregando</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loadingOverlay: {
    alignItems: "center",
    backgroundColor: THEME.colors.transparent78,
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  loadingInner: {
    padding: 16,
    borderRadius: 8,
  },
});
