import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { SocketEvent } from "../../utils/types/socket";

const socket = io(process.env.REACT_APP_SOCKET_URL!, {
  forceNew: true,
  autoConnect: false,
  transports: ["websocket"],
  reconnection: false,
});
type UnregisterFunc = () => void;
type CallbackFunc = (...args: any[]) => any;

interface SocketIOInterface {
  socket: Socket;
  status: ConnectionStatus;
  error?: any;
  registerListener: (forEvent: SocketEvent, cb: CallbackFunc) => UnregisterFunc;
  unregisterListener: (forEvent: SocketEvent, cb: CallbackFunc) => void;
}

const IoContext = createContext<SocketIOInterface>({
  socket,
  status: "disconnected",
  error: undefined,
  registerListener: () => () => {},
  unregisterListener: () => {},
});

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

export const useSocket = () => useContext(IoContext)!;

export const SocketProvider: React.FC<{ children: any }> = ({ children }) => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [error, setError] = useState<any>();

  const registerListener = useCallback(
    (forEvent: SocketEvent, callback: any) => {
      socket.on(forEvent, callback);

      return () => {
        socket.off(forEvent);
      };
    },
    []
  );

  const unregisterListener = useCallback(
    (forEvent: SocketEvent, callback?: (...args: any[]) => any) => {
      socket.off(forEvent);
    },
    []
  );

  useEffect(() => {
    socket
      .connect()
      .on("connect_error", (error) => {
        setError(error);
      })
      .on("disconnect", () => {
        setStatus("disconnected");
      })
      .on("connect", () => {
        setStatus("connected");
        // socket.emit("identity", localStorage.getItem("access_token"));
      });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <IoContext.Provider
      value={{ socket, error, status, registerListener, unregisterListener }}
    >
      {children}{" "}
    </IoContext.Provider>
  );
};
