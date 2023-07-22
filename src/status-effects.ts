export type StatusEffectType = "fire" | "freezing";

interface StatusEffectModifiers {
   readonly moveSpeedMultiplier: number;
}

export const STATUS_EFFECT_MODIFIERS: Record<StatusEffectType, StatusEffectModifiers> = {
   fire: {
      moveSpeedMultiplier: 1
   },
   freezing: {
      moveSpeedMultiplier: 0.5
   }
}