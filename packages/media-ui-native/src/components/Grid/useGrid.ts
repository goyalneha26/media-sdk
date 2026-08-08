
export interface GridState {
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function useGrid({
  loading = false,
  hasMore = false,
  onLoadMore,
}: GridState = {}) {
  const getContainerProps = () => ({
    accessibilityLabel: "Media grid",
  });

  const getItemProps = (index: number) => ({
    accessibilityLabel: `Media item ${index + 1}`,
  });

  const getLoadMoreProps = () => ({
    accessibilityRole: "button" as const,
    accessibilityLabel: loading
      ? "Loading more media"
      : "Load more media",
    disabled: loading || !hasMore,
    onPress: () => {
      if (!loading && hasMore && onLoadMore) {
        onLoadMore();
      }
    },
  });

  return {
    getContainerProps,
    getItemProps,
    getLoadMoreProps,
  };
}

