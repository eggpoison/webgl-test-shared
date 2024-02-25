export enum StatusEffect {
   burning = 1,
   freezing = 2,
   poisoned = 4,
   bleeding = 8
}
export const enum StatusEffectConst {
   burning = 1,
   freezing = 2,
   poisoned = 4,
   bleeding = 8
}

interface StatusEffectModifiers {
   readonly moveSpeedMultiplier: number;
}

export const STATUS_EFFECT_MODIFIERS: Record<StatusEffect, StatusEffectModifiers> = {
   [StatusEffect.burning]: {
      moveSpeedMultiplier: 1
   },
   [StatusEffect.freezing]: {
      moveSpeedMultiplier: 0.5
   },
   [StatusEffect.poisoned]: {
      moveSpeedMultiplier: 0.75
   },
   [StatusEffect.bleeding]: {
      moveSpeedMultiplier: 1
   }
};