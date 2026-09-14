import type { CountryPack } from '../../types';
import { NIGERIA } from './nigeria';
import { KENYA } from './kenya';

/* Onboarding a new country or community = adding one file here.
   The engine and every component are country-agnostic. */
export const PACKS: CountryPack[] = [NIGERIA, KENYA];

export const DEFAULT_PACK_CODE = 'NG';

export function getPack(code: string): CountryPack {
  return PACKS.find((p) => p.code === code) ?? PACKS[0];
}

export { NIGERIA, KENYA };
