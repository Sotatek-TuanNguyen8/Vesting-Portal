import { useEffect } from "react";

// import { useStableFn } from "./useStableFn";
// import { useSocket } from "./useSocket";
// import { SocketEvent } from "../../utils/types/socket";

// export function useSocketFn(
//   forEvent: SocketEvent,
//   callback: (...arg: any[]) => any,
//   enabled = true
// ) {
//   const { registerListener } = useSocket();

//   const handler = useStableFn(callback);

//   useEffect(() => {
//     if (!enabled) return;
//     const cleanup = registerListener(forEvent, handler);

//     return () => {
//       cleanup();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [registerListener, forEvent, enabled]);
// }
