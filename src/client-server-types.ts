import Tile from "./Tile";

type PlayerData = {
   name: string;
}

export interface ServerToClientEvents {
   terrain: (tiles: Array<Array<Tile>>) => void;
   message: (message: string) => void;
   chatMessage: (senderName: string, message: string) => void;
}

export interface ClientToServerEvents {
   chatMessage: (message: string) => void;
   playerData: (playerData: PlayerData) => void;
}

export interface InterServerEvents {}

export interface SocketData {
   name: string;
}