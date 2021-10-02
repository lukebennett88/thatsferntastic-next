import * as React from 'react';

type DefaultValue = string | ((args?: any[]) => any) | null;

export function useLocalStorageState(
  key: string,
  defaultValue: DefaultValue = null,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [any, React.Dispatch<any>] {
  const [state, setState] = React.useState(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const valueInLocalStorage = window.localStorage.getItem(key);
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage);
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}
