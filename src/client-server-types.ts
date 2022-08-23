import { Tile } from "./Tile";

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export interface SocketData {}

export interface ServerToClientEvents {
   chatMessage: (senderName: string, message: string) => void;
   clientDisconnect: (clientID: string) => void;
   initialGameData: (gameTicks: number, tiles: Array<Array<Tile>>) => void;
}

export interface ClientToServerEvents {
   initialPlayerData: (name: string, position: [number, number], visibleChunkBounds: VisibleChunkBounds) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
   newVisibleChunkBounds: (visibleChunkBounds: VisibleChunkBounds) => void;
}

export interface InterServerEvents {}