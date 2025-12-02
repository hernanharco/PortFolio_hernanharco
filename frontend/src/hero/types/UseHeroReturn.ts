// src/types/UseHeroReturn.ts
import type { Hero, HeroInput, ErrorType } from "./HeroData";

/**
 * Interfaz que describe lo que devuelve el hook useHero
 * Separada para mantener responsabilidad y claridad
 */
export interface UseHeroReturn {
  heroes: Hero[];
  isLoading: boolean;
  error: ErrorType;
  separator: string;
  namePart: string;
  fetchHeroes: () => Promise<void>;
  addHero: (heroData: HeroInput) => Promise<Hero | null>;
  updateHero: (id: number, updatedData: HeroInput) => Promise<Hero | null>;
  deleteHero: (id: number) => Promise<boolean>;
}
