import { useState, useEffect, useCallback } from 'react';
import HeroDAO from '../service/HeroDAO.js'; // Ruta corregida para el entorno de compilación

/**
 * Custom Hook para gestionar el estado y las operaciones CRUD de los héroes.
 * Llama al Service HeroDAO para toda la comunicación con la API.
 * * @returns {object} Un objeto con la lista de héroes, el estado de carga y las funciones de mutación.
 */
const useHero = () => {
    // 1. Estado para almacenar la lista de héroes
    const [heroes, setHeroes] = useState([]);
    
    // 2. Estado para el manejo de la UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Obtiene todos los héroes del backend y actualiza el estado.
     * Utiliza useCallback para memorizar la función y evitar re-creaciones innecesarias.
     */
    const fetchHeroes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Llama al DAO/Service
            const data = await HeroDAO.getAllHeroes();
            setHeroes(data);            
        } catch (err) {
            console.error("Error al cargar héroes:", err);
            setError("No se pudo cargar la lista de héroes.");
            setHeroes([]); // Limpiar la lista si falla
        } finally {
            setIsLoading(false);
        }
    }, []); // Dependencias vacías: esta función nunca cambia

    /**
     * Crea un nuevo héroe en el backend y lo añade a la lista local.
     */
    const addHero = async (heroData) => {
        setError(null);
        try {
            // Llama al DAO/Service
            const newHero = await HeroDAO.createHero(heroData);
            
            // Actualización optimista del estado (añadir sin recargar toda la lista)
            setHeroes(prevHeroes => [...prevHeroes, newHero]);
            return newHero;
        } catch (err) {
            console.error("Error al crear héroe:", err);
            setError(err.message || "Fallo al crear el héroe.");
            return null;
        }
    };

    /**
     * Elimina un héroe por ID y lo quita de la lista local.
     */
    const deleteHero = async (id) => {
        setError(null);
        try {
            // Llama al DAO/Service
            await HeroDAO.deleteHero(id);
            
            // Actualización optimista del estado (filtrar el eliminado)
            setHeroes(prevHeroes => prevHeroes.filter(hero => hero.id !== id));
            return true;
        } catch (err) {
            console.error(`Error al eliminar héroe ${id}:`, err);
            setError(err.message || "Fallo al eliminar el héroe.");
            return false;
        }
    };
    
    // 3. Efecto inicial: Cargar los héroes al montar el hook/componente.
    useEffect(() => {
        fetchHeroes();
        console.log("fetchHeroes: ", fetchHeroes)
    }, [fetchHeroes]); // Se ejecuta solo al montar, usando la función memorizada

    // 4. Exponer el estado y las funciones que el componente necesita
    return {
        heroes,
        isLoading,
        error,
        fetchHeroes, // Para recargar manualmente
        addHero,
        deleteHero,
        // Aquí agregarías updateHero y patchHero si fueran necesarios en el 