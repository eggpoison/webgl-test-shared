export enum ParticleType {
   bloodPoolSmall,
   bloodPoolMedium,
   bloodPoolLarge,
   blood,
   cactusSpine,
   dirt,
   leaf,
   rock,
   cactusFlower1,
   cactusFlower1_2,
   cactusFlower2,
   cactusFlower2_2,
   cactusFlower3,
   cactusFlower3_2,
   cactusFlower4,
   cactusFlower4_2,
   cactusFlower5
}

export interface ParticleData {
   readonly id: number;
   readonly type: ParticleType;
   readonly position: [number, number];
   readonly velocity: [number, number] | null;
   readonly acceleration: [number, number] | null;
   readonly rotation: number;
   readonly opacity: number;
}