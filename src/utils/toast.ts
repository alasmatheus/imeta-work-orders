import Toast from "react-native-root-toast";
import { THEME } from "../theme/index";

export type ToastProps = {
  message: string;
  position: "top" | "center" | "bottom";
  textColor: string;
  bgcolor: string;
  duration?: "short" | "long";
};

export async function ShowToast({
  message,
  bgcolor,
  duration,
  position,
  textColor,
}: ToastProps) {
  let toastPosition;

  switch (position) {
    case "top":
      toastPosition = Toast.positions.TOP;
      break;
    case "center":
      toastPosition = Toast.positions.CENTER;
      break;
    case "bottom":
      toastPosition = Toast.positions.BOTTOM;
      break;
    default:
      toastPosition = Toast.positions.BOTTOM;
  }

  const toast = Toast.show(message, {
    duration:
      duration === "short" ? Toast.durations.SHORT : Toast.durations.LONG,
    position: toastPosition,
    backgroundColor: bgcolor,
    containerStyle: {
      marginTop: 100,
    },
    textStyle: {
      color: textColor,
      fontFamily: THEME.fonts.heading,
    },
  });

  setTimeout(
    () => {
      Toast.hide(toast);
    },
    duration === "short" ? 2000 : 3000
  );
}