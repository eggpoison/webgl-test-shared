// @Cleanup: Move server-only stuff to the server and client-only stuff to the client

import { ItemType } from "./items";

export enum TechID {
   woodenTools,
   fire,
   society,
   gathering,
   stoneworking,
   furnace,
   workbench,
   throngling,
   archery,
   leatherworking
}

export interface TechInfo {
   readonly id: TechID;
   readonly name: string;
   readonly description: string;
   readonly iconSrc: string;
   readonly unlockedItems: ReadonlyArray<ItemType>;
   readonly positionX: number;
   readonly positionY: number;
   readonly dependencies: ReadonlyArray<TechID>;
   readonly researchItemRequirements: ReadonlyArray<[ItemType, number]>;
}

export const TECHS: ReadonlyArray<TechInfo> = [
   {
      id: TechID.woodenTools,
      name: "Wooden Tools",
      description: "Basic tools made of wood",
      iconSrc: "wooden-tools.png",
      unlockedItems: [ItemType.wooden_sword, ItemType.wooden_pickaxe, ItemType.wooden_axe],
      positionX: 0,
      positionY: 0,
      dependencies: [],
      researchItemRequirements: [
         [ItemType.wood, 5]
      ]
   },
   {
      id: TechID.fire,
      name: "Fire",
      description: "A primitive method of cooking your food",
      iconSrc: "fire.png",
      unlockedItems: [ItemType.campfire],
      positionX: 33,
      positionY: 10,
      dependencies: [TechID.woodenTools],
      researchItemRequirements: [
         [ItemType.wood, 10]
      ]
   },
   {
      id: TechID.society,
      name: "Society",
      description: "The beginning of a civilisation",
      iconSrc: "society.png",
      unlockedItems: [ItemType.tribe_totem],
      positionX: 25,
      positionY: 40,
      dependencies: [TechID.fire],
      researchItemRequirements: [
         [ItemType.wooden_pickaxe, 1],
         [ItemType.wood, 10]
      ]
   },
   {
      id: TechID.gathering,
      name: "Gathering",
      description: "More efficient gathering of resources",
      iconSrc: "gathering.png",
      unlockedItems: [ItemType.gathering_gloves],
      positionX: 8,
      positionY: -28,
      dependencies: [TechID.woodenTools],
      researchItemRequirements: [
         [ItemType.wood, 25],
         [ItemType.berry, 10]
      ]
   },
   {
       id: TechID.stoneworking,
       name: "Stoneworking",
       description: "Manipulation of stone in crafting",
       iconSrc: "stoneworking.png",
       unlockedItems: [ItemType.stone_pickaxe, ItemType.stone_axe, ItemType.stone_sword],
       positionX: -40,
       positionY: -5,
       dependencies: [TechID.woodenTools],
       researchItemRequirements: [
         [ItemType.rock, 30]
       ]
   },
   {
      id: TechID.furnace,
      name: "Furnace",
      description: "A better way to cook your food",
      iconSrc: "furnace.png",
      unlockedItems: [ItemType.furnace],
      positionX: 55,
      positionY: 10,
      dependencies: [TechID.fire],
      researchItemRequirements: [
         [ItemType.campfire, 2],
         [ItemType.rock, 20]
      ]
   },
   {
      id: TechID.workbench,
      name: "Workbench",
      description: "More advanced crafting recipes",
      iconSrc: "workbench.png",
      unlockedItems: [ItemType.workbench],
      positionX: 48,
      positionY: -12,
      dependencies: [TechID.fire],
      researchItemRequirements: [
         [ItemType.wood, 40]
      ]
   },
   {
      id: TechID.throngling,
      name: "Throngling",
      description: "The way of the throngle",
      iconSrc: "throngling.png",
      unlockedItems: [ItemType.throngler],
      positionX: -28,
      positionY: 18,
      dependencies: [TechID.stoneworking],
      researchItemRequirements: [
         [ItemType.rock, 20],
         [ItemType.cactus_spine, 30]
      ]
   },
   {
      id: TechID.archery,
      name: "Archery",
      description: "Ranged combat",
      iconSrc: "archery.png",
      unlockedItems: [ItemType.wooden_bow],
      positionX: -55,
      positionY: 21,
      dependencies: [TechID.stoneworking],
      researchItemRequirements: [
         [ItemType.wood, 60]
      ]
   },
   {
      id: TechID.leatherworking,
      name: "Leatherworking",
      description: "Stretch and meld leather into armour",
      iconSrc: "leatherworking.png",
      unlockedItems: [ItemType.leather_armour],
      positionX: -60,
      positionY: -18,
      dependencies: [TechID.stoneworking],
      researchItemRequirements: [
         [ItemType.leather, 20]
      ]
   }
];

export function getTechByID(techID: TechID): TechInfo {
   for (let i = 0; i < TECHS.length; i++) {
      const tech = TECHS[i];
      if (tech.id === techID) {
         return tech;
      }
   }
   throw new Error(`No tech with id '${techID}'`);
}

export function getTechRequiredForItem(itemType: ItemType): TechID | null {
   for (const tech of TECHS) {
      if (tech.unlockedItems.includes(itemType)) {
         return tech.id;
      }
   }

   return null;
}