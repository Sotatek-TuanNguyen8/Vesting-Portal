import { useRef, useLayoutEffect, useCallback } from "react";

type TheFunc = (...args: any[]) => any;

export function useStableFn<T extends TheFunc>(handler: T) {
  const handlerRef = useRef<typeof handler>();

  // this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // @ts-ignore
  return useCallback<T>((...args) => {
    // this would throw if called during render
    const fn = handlerRef.current;

    return fn!(...args);
  }, []);
}
