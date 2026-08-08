
import type { ReactNode } from "react";

import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import { useLightbox } from "./useLightbox";

export interface LightboxProps {
  open: boolean;

  onClose: () => void;

  children: ReactNode;

  accessibilityLabel?: string;
}

export function Lightbox({
  open,
  onClose,
  children,
  accessibilityLabel = "Media lightbox",
}: LightboxProps) {
  const {
    getContainerProps,
    getCloseButtonProps,
  } = useLightbox({
    open,
    onClose,
  });

  if (!open) {
    return null;
  }

  const containerProps =
    getContainerProps();

  const closeButtonProps =
    getCloseButtonProps();

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        {...containerProps}
        accessible
        accessibilityLabel={accessibilityLabel}
        style={{
          flex: 1,
          backgroundColor:
            "rgba(0, 0, 0, 0.85)",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 600,
            maxHeight: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            {...closeButtonProps}
            style={{
              position: "absolute",
              top: -20,
              right: -10,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 24,
                fontWeight: "700",
              }}
            >
              ×
            </Text>
          </Pressable>

          {children}
        </View>
      </View>
    </Modal>
  );
}

