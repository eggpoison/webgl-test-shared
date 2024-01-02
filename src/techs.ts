// @Cleanup: Move server-only stuff to the server and client-only stuff to the client

import { ItemRequirements } from "./crafting-recipes";
import { ItemType } from "./items";
import { TribeType } from "./tribes";

export enum TechID {
   woodenTools,
   fire,
   society,
   gathering,
   stoneTools,
   furnace,
   woodworking,
   throngling,
   archery,
   leatherworking,
   warriors,
   basicArchitecture
}

interface TechUnlockProgress {
   readonly itemProgress: ItemRequirements;
   studyProgress: number;
}

/** The current amount of items used in each tech's research */
export type TechTreeUnlockProgress = Partial<Record<TechID, TechUnlockProgress>>;

// @Cleanup: Should this be moved to tribes.ts?
export interface TribeData {
   readonly id: number;
   readonly tribeType: TribeType;
   readonly hasTotem: boolean;
   readonly numHuts: number;
   readonly tribesmanCap: number;
   readonly area: ReadonlyArray<[tileX: number, tileY: number]>;
   readonly selectedTechID: TechID | null;
   readonly unlockedTechs: ReadonlyArray<TechID>;
   readonly techTreeUnlockProgress: TechTreeUnlockProgress;
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
   readonly researchItemRequirements: ItemRequirements;
   readonly researchStudyRequirements: number;
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
      researchItemRequirements: {
         [ItemType.wood]: 5
      },
      researchStudyRequirements: 0
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
      researchItemRequirements: {
         [ItemType.wood]: 10
      },
      researchStudyRequirements: 0
   },
   {
      id: TechID.society,
      name: "Society",
      description: "The beginning of a civilisation",
      iconSrc: "society.png",
      unlockedItems: [ItemType.tribe_totem, ItemType.worker_hut],
      positionX: 40,
      positionY: 35,
      dependencies: [TechID.fire],
      researchItemRequirements: {
         [ItemType.wooden_pickaxe]: 1,
         [ItemType.wood]: 10
      },
      researchStudyRequirements: 20
   },
   {
      id: TechID.gathering,
      name: "Gathering",
      description: "More efficient gathering of resources",
      iconSrc: "gathering.png",
      unlockedItems: [ItemType.gathering_gloves],
      positionX: 22,
      positionY: -26,
      dependencies: [TechID.woodenTools],
      researchItemRequirements: {
         [ItemType.wood]: 25,
         [ItemType.berry]: 10
      },
      researchStudyRequirements: 0
   },
   {
       id: TechID.stoneTools,
       name: "Stone Tools",
       description: "Manipulation of stone in crafting",
       iconSrc: "stoneworking.png",
       unlockedItems: [ItemType.stone_pickaxe, ItemType.stone_axe, ItemType.stone_sword, ItemType.spear],
       positionX: -40,
       positionY: -5,
       dependencies: [TechID.woodenTools],
       researchItemRequirements: {
         [ItemType.rock]: 30
       },
       researchStudyRequirements: 30
   },
   {
      id: TechID.woodworking,
      name: "Woodworking",
      description: "Use a workbench to manipulate wood into more complex shapes",
      iconSrc: "workbench.png",
      unlockedItems: [ItemType.workbench, ItemType.paper, ItemType.research_bench],
      positionX: 56,
      positionY: 4,
      dependencies: [TechID.fire],
      researchItemRequirements: {
         [ItemType.wood]: 40
      },
      researchStudyRequirements: 0
   },
   {
      id: TechID.furnace,
      name: "Furnace",
      description: "A better way to cook your food",
      iconSrc: "furnace.png",
      unlockedItems: [ItemType.furnace],
      positionX: 62,
      positionY: 15,
      dependencies: [TechID.woodworking],
      researchItemRequirements: {
         [ItemType.campfire]: 2,
         [ItemType.rock]: 20
      },
      researchStudyRequirements: 10
   },
   {
      id: TechID.throngling,
      name: "Throngling",
      description: "The way of the throngle",
      iconSrc: "throngling.png",
      unlockedItems: [ItemType.throngler],
      positionX: -28,
      positionY: 18,
      dependencies: [TechID.stoneTools],
      researchItemRequirements: {
         [ItemType.rock]: 20,
         [ItemType.cactus_spine]: 30
      },
      researchStudyRequirements: 40
   },
   {
      id: TechID.archery,
      name: "Archery",
      description: "Ranged combat",
      iconSrc: "archery.png",
      unlockedItems: [ItemType.wooden_bow],
      positionX: -55,
      positionY: 21,
      dependencies: [TechID.stoneTools],
      researchItemRequirements: {
         [ItemType.wood]: 60
      },
      researchStudyRequirements: 75
   },
   {
      id: TechID.leatherworking,
      name: "Leatherworking",
      description: "Stretch and meld leather into armour",
      iconSrc: "leatherworking.png",
      unlockedItems: [ItemType.leather_armour],
      positionX: -60,
      positionY: -18,
      dependencies: [TechID.stoneTools],
      researchItemRequirements: {
         [ItemType.leather]: 20
      },
      researchStudyRequirements: 50
   },
   {
      id: TechID.warriors,
      name: "Warriors",
      description: "Combat-focused tribesmen",
      iconSrc: "warriors.png",
      unlockedItems: [ItemType.warrior_hut],
      positionX: 50,
      positionY: 43,
      dependencies: [TechID.society],
      researchItemRequirements: {
         [ItemType.wood]: 50,
         [ItemType.rock]: 50
      },
      researchStudyRequirements: 100
   },
   {
      id: TechID.basicArchitecture,
      name: "Basic Architecture",
      description: "Primitive structures to build a defense with",
      iconSrc: "basic-architecture.png",
      unlockedItems: [ItemType.wooden_wall],
      positionX: 72,
      positionY: 0,
      dependencies: [TechID.woodworking],
      researchItemRequirements: {
         [ItemType.wood]: 100
      },
      researchStudyRequirements: 150
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