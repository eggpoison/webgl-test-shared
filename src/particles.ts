export enum ParticleType {
   bloodPoolSmall,
   bloodPoolMedium,
   bloodPoolLarge,
   blood
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