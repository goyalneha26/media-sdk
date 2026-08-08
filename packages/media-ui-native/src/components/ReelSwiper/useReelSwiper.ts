import {
  useCallback,
  useState
} from "react";

export interface ReelSwiperState {
  itemCount: number;

  onActiveChange?: (
    index: number
  ) => void;
}

export function useReelSwiper({
  itemCount,
  onActiveChange
}: ReelSwiperState) {
  const [
    activeIndex,
    setActiveIndex
  ] = useState(0);

  const setActive = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= itemCount
      ) {
        return;
      }

      setActiveIndex(index);

      onActiveChange?.(
        index
      );
    },
    [
      itemCount,
      onActiveChange
    ]
  );

  const next = useCallback(() => {
    setActive(
      Math.min(
        activeIndex + 1,
        itemCount - 1
      )
    );
  }, [
    activeIndex,
    itemCount,
    setActive
  ]);

  const previous = useCallback(() => {
    setActive(
      Math.max(
        activeIndex - 1,
        0
      )
    );
  }, [
    activeIndex,
    setActive
  ]);

  const getContainerProps = () => ({
    accessibilityRole: "adjustable" as const,
    accessibilityLabel: "Media reels"
  });

  const getItemProps = (
    index: number
  ) => ({
    accessibilityRole: "none" as const,
    accessibilityLabel:
      `Reel ${index + 1}`
  });

  return {
    activeIndex,
    setActive,
    next,
    previous,
    getContainerProps,
    getItemProps
  };
}