import { Tile } from "./Tile";

export interface SocketData {
   name: string;
   position: [number, number];
   clientID: string;
}

export interface ServerToClientEvents {
   terrain: (tiles: Array<Array<Tile>>) => void;
   chatMessage: (senderName: string, message: string) => void;
   newPlayer: (socketData: SocketData) => void;
   playerMovement: (clientID: string, movementHash: number) => void;
   position: () => void;
   clientDisconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   chatMessage: (message: string) => void;
   socketData: (socketData: SocketData) => void;
   playerMovement: (movementHash: number) => void;
   position: (position: [number, number]) => void;
}

export interface InterServerEvents {}