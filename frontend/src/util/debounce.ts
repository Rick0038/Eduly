type DebouncedFunction<T extends (...args: never[]) => void> = (
  ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
