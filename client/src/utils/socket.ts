import { io, Socket } from "socket.io-client";

// Singleton class for socket management
export default class SocketManager {
  private socket: Socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:9090", {
    autoConnect: false,
  });
  private static instance: SocketManager = new SocketManager();

  private constructor() {}

  public static get getInstance(): SocketManager {
    return this.instance;
  }

  public openConnection() {
    this.socket.connect();
  }

  public listenEvent(event: string, listener: any) {
    this.socket.on(event, listener);
  }

  public emitEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }

  public closeConnection() {
    this.socket.close();
  }
}
