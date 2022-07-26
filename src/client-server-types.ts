import Tile from "./Tile";

export type PlayerData = {
   name: string;
   position: [number, number];
}

export interface SocketData extends PlayerData {
   clientID: string;
}

export interface ServerToClientEvents {
   terrain: (tiles: Array<Array<Tile>>) => void;
   message: (message: string) => void;
   chatMessage: (senderName: string, message: string) => void;
   newPlayer: (playerData: SocketData) => void;
   playerMovement: (clientID: string, movementHash: number) => void;
   position: () => void;
   clientDisconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   chatMessage: (message: string) => void;
   playerData: (data: PlayerData) => void;
   playerMovement: (movementHash: number) => void;
   position: (position: [number, number]) => void;
}

export interface InterServerEvents {}