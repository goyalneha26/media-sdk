
import type { ReactNode } from "react";
import {
  View,
  Pressable,
  Text,
} from "react-native";

import { useGrid } from "./useGrid";

export interface GridProps<T> {
  items: T[];

  getKey?: (
    item: T,
    index: number
  ) => string;

  renderItem?: (
    item: T,
    index: number
  ) => ReactNode;

  onItemClick?: (
    item: T,
    index: number
  ) => void;

  onLoadMore?: () => void;

  hasMore?: boolean;

  loading?: boolean;

  numColumns?: number;
}

export function Grid<T>({
  items,
  getKey,
  renderItem,
  onItemClick,
  onLoadMore,
  hasMore = false,
  loading = false,
  numColumns = 2,
}: GridProps<T>) {
  const {
    getContainerProps,
    getItemProps,
    getLoadMoreProps,
  } = useGrid({
    loading,
    hasMore,
    onLoadMore,
  });

  return (
    <View {...getContainerProps()}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => {
          const content = renderItem
            ? renderItem(item, index)
            : null;

          const itemProps = getItemProps(index);

          const key = getKey
            ? getKey(item, index)
            : String(index);

          const itemView = (
            <View
              key={key}
              {...itemProps}
              style={{
                width: `${100 / numColumns}%`,
              }}
              accessible
              accessibilityLabel={`Media item ${index + 1}`}
            >
              {content}
            </View>
          );

          if (onItemClick) {
            return (
              <Pressable
                key={key}
                onPress={() =>
                  onItemClick(item, index)
                }
                accessibilityRole="button"
                accessibilityLabel={`Open media item ${index + 1}`}
              >
                {itemView}
              </Pressable>
            );
          }

          return itemView;
        })}
      </View>

      {hasMore ? (
        <Pressable
          {...getLoadMoreProps()}
          accessibilityRole="button"
          accessibilityLabel={
            loading
              ? "Loading more media"
              : "Load more media"
          }
        >
          <Text>
            {loading
              ? "Loading..."
              : "Load more"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
