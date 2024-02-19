import { EntityInfoClientArgs, EntityType, TribeMemberAction } from "./entities";
import { ItemType } from "./items";
import { StatusEffect } from "./status-effects";
import { TechID, TribeData } from "./techs";
import { BiomeName, TileType } from "./tiles";
import { TribeType } from "./tribes";

export interface ItemData {
   /** Unique identifier for the number */
   readonly id: number;
   readonly type: ItemType;
   readonly count: number;
}

export type ItemSlotData = ItemData | null;

export type ItemSlotsData = { [itemSlot: number]: ItemData };

export interface InventoryData {
   readonly width: number;
   readonly height: number;
   readonly itemSlots: ItemSlotsData;
   readonly inventoryName: string;
}

export interface PlayerInventoryData {
   readonly hotbar: InventoryData;
   readonly backpackSlot: InventoryData;
   readonly backpackInventory: InventoryData;
   /** Item currently being held by the player */
   readonly heldItemSlot: InventoryData;
   /** Item held in the player's crafting output slot */
   readonly craftingOutputItemSlot: InventoryData;
   readonly armourSlot: InventoryData;
   readonly gloveSlot: InventoryData;
   readonly offhand: InventoryData;
}

export interface ServerTileData {
   // @Cleanup: We don't need to send the x and y coordinates of a tile
   readonly x: number;
   readonly y: number;
   readonly type: TileType;
   readonly biomeName: BiomeName;
   readonly isWall: boolean;
}

export type ServerTileUpdateData = {
   readonly tileIndex: number;
   readonly type: TileType;
   readonly isWall: boolean;
}

export interface BaseHitboxData {
   readonly mass: number;
   readonly offsetX: number;
   readonly offsetY: number;
   readonly localID: number;
}

export interface CircularHitboxData extends BaseHitboxData {
   readonly radius: number;
}

export interface RectangularHitboxData extends BaseHitboxData {
   readonly width: number;
   readonly height: number;
   readonly rotation: number;
}

export interface StatusEffectData {
   readonly type: StatusEffect;
   readonly ticksElapsed: number;
}

export const HitFlags = {
   HIT_BY_FLESH_SWORD: 1 << 0
}

// @Cleanup: A whole bunch of this data isn't needed client-side except for when the player itself is hit, maybe make 2 types - 1 for player hits, 1 for non-player hits
export interface HitData {
   // Two following values are used for if the hit is a killing blow so the client doesn't know where the hit entity is
   readonly entityPositionX: number;
   readonly entityPositionY: number;
   readonly hitEntityID: number;
   /** Used for client-side damage numbers */
   readonly damage: number;
   readonly knockback: number;
   readonly angleFromAttacker: number | null;
   readonly attackerID: number;
   readonly flags: number;
}

export interface EntityData<T extends EntityType = EntityType> {
   readonly id: number;
   readonly position: [number, number];
   readonly velocity: [number, number];
   readonly rotation: number;
   readonly rectangularHitboxes: ReadonlyArray<RectangularHitboxData>;
   readonly circularHitboxes: ReadonlyArray<CircularHitboxData>;
   readonly ageTicks: number;
   readonly type: T;
   readonly clientArgs: Parameters<typeof EntityInfoClientArgs[T]>;
   readonly statusEffects: Array<StatusEffectData>;
   readonly amountHealed: number;
}

// @Cleanup: A whole bunch of the data in this for the player can be deduced from the entity data array
/** Data about the game state sent to the client each tick */
export interface GameDataPacket {
   readonly entityDataArray: ReadonlyArray<EntityData<EntityType>>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   /** All hits taken by visible entities server-side */
   readonly hitsTaken: ReadonlyArray<HitData>;
   readonly inventory: PlayerInventoryData;
   /** How many ticks have passed in the server */
   readonly serverTicks: number;
   /** Current time of the server */
   readonly serverTime: number;
   readonly playerHealth: number;
   /** Extra debug information about a game object being tracked */
   readonly gameObjectDebugData?: GameObjectDebugData;
   readonly tribeData: TribeData;
   readonly hasFrostShield: boolean;
   readonly pickedUpItem: boolean;
   readonly hotbarCrossbowLoadProgressRecord: Record<number, number>;
}

export enum WaterRockSize {
   small,
   large
}

export interface WaterRockData {
   readonly position: [number, number];
   readonly rotation: number;
   readonly size: WaterRockSize;
   readonly opacity: number;
}

export enum RiverSteppingStoneSize {
   small,
   medium,
   large
}

export const RIVER_STEPPING_STONE_SIZES: Record<RiverSteppingStoneSize, number> = {
   [RiverSteppingStoneSize.small]: 32,
   [RiverSteppingStoneSize.medium]: 48,
   [RiverSteppingStoneSize.large]: 56
};

export interface RiverSteppingStoneData {
   readonly positionX: number;
   readonly positionY: number;
   readonly rotation: number;
   readonly size: RiverSteppingStoneSize;
   /** ID of the group the stepping stone belongs to */
   readonly groupID: number;
}

export interface GrassTileInfo {
   readonly temperature: number;
   readonly humidity: number;
}

export enum DecorationType {
   pebble,
   rock,
   sandstoneRock,
   sandstoneRockBig,
   blackRockSmall,
   blackRock,
   snowPile,
   flower1,
   flower2,
   flower3,
   flower4
}

export interface DecorationInfo {
   readonly positionX: number;
   readonly positionY: number;
   readonly rotation: number;
   readonly type: DecorationType;
   readonly variant: number;
}

/** Initial data sent to the client */
export interface InitialGameDataPacket extends GameDataPacket {
   readonly playerID: number;
   readonly tiles: Array<ServerTileData>;
   readonly waterRocks: ReadonlyArray<WaterRockData>;
   readonly riverSteppingStones: ReadonlyArray<RiverSteppingStoneData>;
   readonly riverFlowDirections: Record<number, Record<number, number>>;
   readonly edgeTiles: Array<ServerTileData>;
   readonly edgeRiverFlowDirections: Record<number, Record<number, number>>;
   readonly edgeRiverSteppingStones: ReadonlyArray<RiverSteppingStoneData>;
   readonly grassInfo: Record<number, Record<number, GrassTileInfo>>;
   readonly decorations: ReadonlyArray<DecorationInfo>;
}

export type VisibleChunkBounds = [minChunkX: number, maxChunkX: number, minChunkY: number, maxChunkY: number];

/** Data the player sends to the server each tick */
export type PlayerDataPacket = {
   // @Vulnerability: Implement client-side prediction
   readonly position: [number, number]; // Point
   readonly velocity: [number, number];
   readonly acceleration: [number, number];
   readonly rotation: number;
   // @Vulnerability: Allows falsely sending way larger visible chunk bounds which can slow down the server a ton
   readonly visibleChunkBounds: VisibleChunkBounds;
   readonly selectedItemSlot: number;
   readonly mainAction: TribeMemberAction;
   readonly offhandAction: TribeMemberAction;
   /** ID of the entity the player is interacting with */
   readonly interactingEntityID: number | null;
}

/** 
 * Data the server has about the player and game state.
 * Used when syncing a player with the server when they tab back into the game.
 *  */
export interface GameDataSyncPacket {
   readonly position: [number, number];
   readonly velocity: [number, number];
   readonly acceleration: [number, number];
   readonly rotation: number;
   readonly health: number;
   readonly inventory: PlayerInventoryData;
}

/** Data sent to the server when an attack is performed */
export interface AttackPacket {
   /** The item slot of the item which is being used to attack */
   readonly itemSlot: number;
   /** The direction that the attack is being done */
   readonly attackDirection: number;
}

export interface RespawnDataPacket {
   readonly playerID: number;
   readonly spawnPosition: [number, number];
}

export interface DebugData {
   readonly colour: [r: number, g: number, b: number];
}

export interface LineDebugData extends DebugData {
   readonly targetPosition: [number, number];
   readonly thickness: number;
}

export interface CircleDebugData extends DebugData {
   readonly radius: number;
   readonly thickness: number;
}

export interface TileHighlightData extends DebugData {
   readonly tilePosition: [tileX: number, tileY: number];
}

export interface GameObjectDebugData {
   /** ID of the game object being tracked */
   readonly gameObjectID: number;
   readonly lines: Array<LineDebugData>;
   readonly circles: Array<CircleDebugData>;
   readonly tileHighlights: Array<TileHighlightData>;
   readonly debugEntries: Array<string>;
   readonly health?: number;
   readonly maxHealth?: number;
}

export enum BlueprintBuildingType {
   door,
   embrasure,
   ballista,
   slingTurret
}
export type BuildingShapeType = BlueprintBuildingType.door | BlueprintBuildingType.embrasure;

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   spawn_position: (spawnPosition: [number, number]) => void;
   initial_game_data_packet: (gameDataPacket: InitialGameDataPacket) => void;
   game_data_packet: (gameDataPacket: GameDataPacket) => void;
   game_data_sync_packet: (gameDataSyncPacket: GameDataSyncPacket) => void;
   chat_message: (senderName: string, message: string) => void;
   client_disconnect: (clientID: string) => void;
   respawn_data_packet: (respawnDataPacket: RespawnDataPacket) => void;
   force_position_update: (position: [number, number]) => void;
}

export interface ClientToServerEvents {
   spawn_position_request: () => void;
   initial_player_data: (username: string, tribeType: TribeType) => void;
   visible_chunk_bounds: (visibleChunkBounds: VisibleChunkBounds) => void;
   initial_game_data_request: () => void;
   deactivate: () => void;
   activate: () => void;
   player_data_packet: (playerDataPacket: PlayerDataPacket) => void;
   chat_message: (message: string) => void;
   player_movement: (position: [number, number], movementHash: number) => void;
   crafting_packet: (recipeIndex: number) => void;
   item_pickup: (entityID: number, inventoryName: string, itemSlot: number, amount: number) => void;
   // Tells the server that the client wants to release the held item at the specified place in an inventory
   item_release: (entityID: number, inventoryName: string, itemSlot: number, amount: number) => void;
   // Effectively the item_pickup and item_release events combined
   attack_packet: (attackPacket: AttackPacket) => void;
   item_use_packet: (itemSlot: number) => void;
   held_item_drop: (dropAmount: number, dropDirection: number) => void;
   // For dropping items on the ground
   item_drop: (itemSlot: number, dropAmount: number, dropDirection: number) => void;
   // Tells the server to respawn the client
   respawn: () => void;
   command: (command: string) => void;
   // Tells the server to start sending debug information about a certain game object
   track_game_object: (gameObjectID: number | null) => void;
   select_tech: (techID: TechID) => void;
   unlock_tech: (techID: TechID) => void;
   force_unlock_tech: (techID: TechID) => void;
   study_tech: (studyAmount: number) => void;
   shape_structure: (structureID: number, shapeType: BuildingShapeType) => void;
   structure_interact: (structureID: number) => void;
}

export interface InterServerEvents {}