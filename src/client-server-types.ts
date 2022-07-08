import Tile from "./Tile";

export type PlayerData = {
   clientID: string;
   name: string;
   position: [number, number];
}

export type SocketData = Omit<PlayerData, "clientID">;

export interface ServerToClientEvents {
   terrain: (tiles: Array<Array<Tile>>) => void;
   message: (message: string) => void;
   chatMessage: (senderName: string, message: string) => void;
   newPlayer: (playerData: PlayerData) => void;
   playerMovement: (clientID: string, movement: number) => void;
} 

export interface ClientToServerEvents {
   chatMessage: (message: string) => void;
   playerData: (data: SocketData) => void;
   playerMovement: (movement: number) => void;
}

export interface InterServerEvents {}