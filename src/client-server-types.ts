import { Tile } from "./Tile";

export interface SocketData {}

export interface ServerToClientEvents {
   chatMessage: (senderName: string, message: string) => void;
   clientDisconnect: (clientID: string) => void;
   gameData: (gameTicks: number, tiles: Array<Array<Tile>>) => void;
}

export interface ClientToServerEvents {
   initialPlayerData: (name: string, position: [number, number]) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
}

export interface InterServerEvents {}