
export interface LightboxState {
  open: boolean;
  onClose: () => void;
}

export function useLightbox({
  open,
  onClose,
}: LightboxState) {
  const getContainerProps = () => ({
    accessibilityViewIsModal: true,
  });

  const getCloseButtonProps = () => ({
    accessibilityRole: "button" as const,
    accessibilityLabel: "Close media lightbox",
    onPress: onClose,
  });

  return {
    open,
    getContainerProps,
    getCloseButtonProps,
  };
}

