import { Tile } from "./Tile";

export interface SocketData {
   name: string;
   position: [number, number];
   clientID: string;
}

export type EntityPacket = {
   readonly positions: Array<[number, number]>;
   readonly entityID: number;
}

export type Packet = EntityPacket;

export interface ServerToClientEvents {
   terrain: (tiles: Array<Array<Tile>>) => void;
   chatMessage: (senderName: string, message: string) => void;
   newPlayer: (socketData: SocketData) => void;
   playerMovement: (clientID: string, movementHash: number) => void;
   position: () => void;
   clientDisconnect: (clientID: string) => void;
   entityPacket: (packet: EntityPacket) => void;
}

export interface ClientToServerEvents {
   initialPlayerData: (name: string, position: [number, number]) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
}

export interface InterServerEvents {}