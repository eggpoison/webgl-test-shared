export enum StatusEffect {
   burning,
   freezing,
   poisoned,
   bleeding
}
export const enum StatusEffectConst {
   burning,
   freezing,
   poisoned,
   bleeding
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
      moveSpeedMultiplier: 0.8
   },
   [StatusEffect.bleeding]: {
      moveSpeedMultiplier: 1
   }
};