import type { ReactNode } from "react";
import {
  View,
  Pressable,
} from "react-native";

import {
  useReelSwiper,
} from "./useReelSwiper.js";

export interface ReelSwiperProps {
  items: ReactNode[];

  onActiveChange?: (
    index: number
  ) => void;

  className?: string;

  itemClassName?: string;

  showControls?: boolean;
}

export function ReelSwiper({
  items,
  onActiveChange,
  showControls = true,
}: ReelSwiperProps) {
  const {
    activeIndex,
    next,
    previous,
    getContainerProps,
    getItemProps,
  } = useReelSwiper({
    itemCount: items.length,
    onActiveChange,
  });

  return (
    <View
      {...getContainerProps()}
    >
      {showControls && (
        <Pressable
          onPress={previous}
          disabled={activeIndex === 0}
          accessibilityRole="button"
          accessibilityLabel="Previous reel"
        />
      )}

      <View>
        {items.map((item, index) => (
          <View
            key={index}
            {...getItemProps(index)}
          >
            {item}
          </View>
        ))}
      </View>

      {showControls && (
        <Pressable
          onPress={next}
          disabled={
            activeIndex >= items.length - 1
          }
          accessibilityRole="button"
          accessibilityLabel="Next reel"
        />
      )}
    </View>
  );
}