import Tile from "./Tile";

export interface ServerToClientEvents {
   terrain: (tiles: Array<Array<Tile>>) => void;
   message: (message: string) => void;
   chatMessage: (senderName: string, message: string) => void;
}

export interface ClientToServerEvents {
   chatMessage: (message: string) => void;
   name: (name: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
   name: string;
}