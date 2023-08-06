export type StatusEffectType = "fire" | "freezing" | "poisoned";

interface StatusEffectModifiers {
   readonly moveSpeedMultiplier: number;
}

export const STATUS_EFFECT_MODIFIERS: Record<StatusEffectType, StatusEffectModifiers> = {
   fire: {
      moveSpeedMultiplier: 1
   },
   freezing: {
      moveSpeedMultiplier: 0.5
   },
   poisoned: {
      moveSpeedMultiplier: 1
   }
}