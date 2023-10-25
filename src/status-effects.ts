export type StatusEffect = "burning" | "freezing" | "poisoned" | "bleeding";

interface StatusEffectModifiers {
   readonly moveSpeedMultiplier: number;
}

export const STATUS_EFFECT_MODIFIERS: Record<StatusEffect, StatusEffectModifiers> = {
   burning: {
      moveSpeedMultiplier: 1
   },
   freezing: {
      moveSpeedMultiplier: 0.5
   },
   poisoned: {
      moveSpeedMultiplier: 1
   },
   bleeding: {
      moveSpeedMultiplier: 1
   }
};