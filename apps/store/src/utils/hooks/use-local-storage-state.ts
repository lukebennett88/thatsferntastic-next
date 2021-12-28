import * as React from "react";

const isBrowser = typeof window !== "undefined";

type Serializer<T> = (object: T | undefined) => string;
type Parser<T> = (val: string) => T | undefined;
type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type Options<T> = Partial<{
  serializer: Serializer<T>;
  parser: Parser<T>;
  logger: (error: unknown) => void;
  syncData: boolean;
}>;

export function useLocalStorageState<T>(key: string, defaultValue: T, options?: Options<T>): readonly [T, Setter<T>];
export function useLocalStorageState<T>(
  key: string,
  defaultValue?: undefined,
  options?: Options<T>,
): readonly [T | undefined, Setter<T | undefined>];
export function useLocalStorageState<T>(
  key: string,
  defaultValue?: T,
  options?: Options<T>,
): readonly [T | undefined, Setter<T | undefined>] {
  const opts = React.useMemo(() => {
    return {
      serializer: JSON.stringify,
      parser: JSON.parse,
      logger: console.log,
      syncData: true,
      ...options,
    };
  }, [options]);

  const { serializer, parser, logger, syncData } = opts;

  const [storedValue, setValue] = React.useState(() => {
    try {
      if (!isBrowser) return defaultValue;
      const item = localStorage.getItem(key);
      const res: T = item ? parser(item) : defaultValue;
      return res;
    } catch (error) {
      logger(error);
      return defaultValue;
    }
  });

  React.useEffect(() => {
    try {
      if (!isBrowser) return;
      localStorage.setItem(key, serializer(storedValue));
    } catch (error) {
      logger(error);
    }
  }, [key, logger, serializer, storedValue]);

  React.useEffect(() => {
    if (!syncData) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== localStorage) return;

      try {
        setValue(event.newValue ? parser(event.newValue) : undefined);
      } catch (error) {
        logger(error);
      }
    };

    addEventListener("storage", handleStorageChange);
    return () => removeEventListener("storage", handleStorageChange);
  }, [key, logger, parser, syncData]);

  return [storedValue, setValue] as const;
}
