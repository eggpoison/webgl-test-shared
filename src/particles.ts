export enum ParticleType {
   bloodPoolSmall,
   bloodPoolMedium,
   bloodPoolLarge,
   blood,
   bloodLarge,
   cactusSpine,
   dirt,
   leaf,
   rock,
   rockLarge,
   cactusFlower1,
   cactusFlower1_2,
   cactusFlower2,
   cactusFlower2_2,
   cactusFlower3,
   cactusFlower3_2,
   cactusFlower4,
   cactusFlower4_2,
   cactusFlower5,
   smokeBlack,
   emberRed,
   emberOrange,
   footprint,
   poisonDroplet,
   slimePuddle,
   waterSplash,
   waterDroplet,
   snow
}

export type ParticleTint = [r: number, g: number, b: number];
export type ParticleColour = [r: number, g: number, b: number];

export interface BaseParticleData {
   readonly id: number;
   readonly type: ParticleType;
   readonly position: [number, number];
   readonly velocity: [number, number] | null;
   readonly acceleration: [number, number] | null;
   readonly rotation: number;
   readonly opacity: number;
   /** How much the particle's size is multiplied. 1 = normal, 2 = double, etc. */
   readonly scale: number;
   readonly age: number;
   readonly lifetime: number;
}

export interface TexturedParticleData extends BaseParticleData {
   /** Multiplies the particle's colour */
   readonly tint: ParticleTint;
}

export interface MonocolourParticleData extends BaseParticleData {}