import { useState, useEffect, useCallback } from "react";
import HeroDAO from "@/hero/service/HeroDAO.js";
import TextSplitter from "@/utils/TextSplitter";

// Tipos importados desde nuestros archivos de tipos
import type { Hero, HeroInput, ErrorType } from "@/hero/types/HeroData";
import type { UseHeroReturn } from "@/hero/types/UseHeroReturn";

/**
 * Custom Hook para manejar héroes en la aplicación.
 * Este hook:
 * - Consulta y muta los datos de héroes a través de HeroDAO.
 * - Maneja estado de UI: carga y errores.
 * - Genera estados derivados para la UI (separator y namePart).
 *
 * @returns UseHeroReturn - Objeto con estados y funciones para usar en componentes.
 */
const useHeroCRUD = (): UseHeroReturn => {
  // --- Estado principal ---
  // Lista de héroes obtenida desde la API
  const [heroes, setHeroes] = useState<Hero[]>([]);

  // Estado para mostrar spinner/carga en la UI
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado para almacenar mensajes de error
  const [error, setError] = useState<ErrorType>(null);

  // --- Estados derivados para UI ---
  // Separación de título: parte antes del nombre
  const [separator, setSeparator] = useState<string>("");

  // Parte del título que se resalta
  const [namePart, setNamePart] = useState<string>("");

  // Texto que usamos como prefijo para separar el título
  const SEPARATOR_TEXT = "Hola, soy ";

  // --- FUNCIONES CRUD ---

  /**
   * fetchHeroes - Obtiene todos los héroes desde el backend.
   * Maneja estado de carga y errores.
   */
  const fetchHeroes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: Hero[] = await HeroDAO.getAllHeroes();
      setHeroes(data);
    } catch (err: any) {
      console.error("Error al cargar héroes:", err);
      setError("No se pudo cargar la lista de héroes.");
      setHeroes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * addHero - Agrega un nuevo héroe a la base de datos y actualiza el estado local.
   * @param heroData - Datos del héroe a crear
   * @returns Hero|null - El héroe creado o null si falla
   */
  const addHero = async (heroData: HeroInput): Promise<Hero | null> => {
    setError(null);
    try {
      const newHero: Hero = await HeroDAO.createHero(heroData);
      setHeroes((prevHeroes) => [...prevHeroes, newHero]);
      return newHero;
    } catch (err: any) {
      console.error("Error al crear héroe:", err);
      setError(err.message || "Fallo al crear el héroe.");
      return null;
    }
  };

  /**
   * updateHero - Actualiza un héroe existente.
   * Actualiza tanto la base de datos como el estado local (optimistic update).
   * @param id - ID del héroe a actualizar
   * @param updatedData - Campos que se actualizarán
   * @returns Hero|null - Héroe actualizado o null si falla
   */
  const updateHero = async (
    id: number,
    updatedData: HeroInput
  ): Promise<Hero | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedHero: Hero = await HeroDAO.updateHero(id, updatedData);

      // Actualización optimista: reemplazamos el héroe en el estado local
      setHeroes((prevHeroes) =>
        prevHeroes.map((hero) => (hero.id === id ? updatedHero : hero))
      );

      return updatedHero;
    } catch (err: any) {
      console.error(`Error al actualizar héroe ${id}:`, err);
      setError(err.message || "Fallo al actualizar el héroe.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * deleteHero - Elimina un héroe por ID
   * @param id - ID del héroe a eliminar
   * @returns boolean - true si se eliminó correctamente, false si falla
   */
  const deleteHero = async (id: number): Promise<boolean> => {
    setError(null);
    try {
      await HeroDAO.deleteHero(id);
      setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== id));
      return true;
    } catch (err: any) {
      console.error(`Error al eliminar héroe ${id}:`, err);
      setError(err.message || "Fallo al eliminar el héroe.");
      return false;
    }
  };

  // --- EFECTOS ---

  // Cargar héroes automáticamente cuando el hook se monta
  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  // Separar título del primer héroe en partes para la UI
  useEffect(() => {
    if (heroes.length > 0) {
      const fullTitle = heroes[0].title;
      const { prefixPart, restPart } = TextSplitter.splitByPrefix(
        fullTitle,
        SEPARATOR_TEXT
      );
      setSeparator(prefixPart);
      setNamePart(restPart);
    } else {
      setSeparator("");
      setNamePart("");
    }
  }, [heroes]);

  // --- Retorno del hook ---
  // Exponemos todos los estados y funciones para que los componentes puedan usarlos
  return {
    heroes,
    isLoading,
    error,
    separator,
    namePart,
    fetchHeroes,
    addHero,
    updateHero,
    deleteHero,
  };
};

export default useHeroCRUD;
