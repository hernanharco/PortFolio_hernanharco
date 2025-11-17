import { useState, useEffect, useCallback } from "react";
import HeroDAO from "@/features/hero/service/HeroDAO.js"; // Ruta corregida para el entorno de compilación
import TextSplitter from "@/utils/TextSplitter"; // Importación de la clase de utilidad

/**
 * Custom Hook para gestionar el estado y las operaciones CRUD de los héroes.
 * Llama al Service HeroDAO para toda la comunicación con la API.
 * @returns {object} Un objeto con la lista de héroes, el estado de carga, el título separado y las funciones de mutación.
 */
const useHero = () => {
  // 1. Estado para almacenar la lista de héroes (Datos de la DB)
  const [heroes, setHeroes] = useState([]);

  // 2. Estado para el manejo de la UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Estados derivados para la división del título
  const [separator, setSeparator] = useState("");
  const [namePart, setNamePart] = useState("");

  // Constante para el prefijo de separación
  const SEPARATOR_TEXT = "Hola, soy ";

  // --- Funciones CRUD ---

  const fetchHeroes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await HeroDAO.getAllHeroes();
      setHeroes(data);
    } catch (err) {
      console.error("Error al cargar héroes:", err);
      setError("No se pudo cargar la lista de héroes.");
      setHeroes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addHero = async (heroData) => {
    setError(null);
    try {
      const newHero = await HeroDAO.createHero(heroData);
      setHeroes((prevHeroes) => [...prevHeroes, newHero]);
      return newHero;
    } catch (err) {
      console.error("Error al crear héroe:", err);
      setError(err.message || "Fallo al crear el héroe.");
      return null;
    }
  };

  /**
   * Función para actualizar un héroe existente. (NUEVA FUNCIÓN DE ACTUALIZACIÓN)
   * @param {string} id - El ID del héroe a actualizar.
   * @param {object} updatedData - Los campos y valores a modificar.
   * @returns {object|null} El héroe actualizado si tiene éxito, o null si falla.
   */
  const updateHero = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Llama al DAO para guardar en la base de datos
      const updatedHero = await HeroDAO.updateHero(id, updatedData);

      // 2. Actualización optimista del estado local:
      // Reemplazamos el héroe antiguo por su nueva versión
      setHeroes((prevHeroes) =>
        prevHeroes.map((hero) => (hero.id === id ? updatedHero : hero))
      );

      return updatedHero;
    } catch (err) {
      console.error(`Error al actualizar héroe ${id}:`, err);
      setError(err.message || "Fallo al actualizar el héroe.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHero = async (id) => {
    setError(null);
    try {
      await HeroDAO.deleteHero(id);
      setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== id));
      return true;
    } catch (err) {
      console.error(`Error al eliminar héroe ${id}:`, err);
      setError(err.message || "Fallo al eliminar el héroe.");
      return false;
    }
  };

  // --- Efectos ---

  // 4. Efecto inicial: Cargar los héroes al montar el hook.
  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  // 5. Lógica de separación de texto: Se ejecuta CADA VEZ que 'heroes' se actualiza.
  useEffect(() => {
    if (heroes && heroes.length > 0) {
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
  }, [heroes]); // Dependencia: Solo se actualiza si el array heroes cambia

  // 6. Exponer el estado y las funciones que el componente necesita
  return {
    heroes,
    isLoading,
    error,
    // Valores derivados para el título
    separator,
    namePart,
    // Funciones de mutación y recarga
    fetchHeroes,
    addHero,
    updateHero, // EXPUESTA: La nueva función de actualización
    deleteHero,
  };
};

export default useHero;
