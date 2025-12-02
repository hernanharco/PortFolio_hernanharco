/**
 * Este archivo contiene la interfaz y tipos relacionados con los héroes.
 * Basado en el modelo de Django heroModels.
 */

/**
 * Interfaz que representa un héroe según el backend.
 */
export interface Hero {
  id: number;             // ID autogenerado por Django
  city: string;           // Ciudad del héroe
  title: string;          // Título principal
  subtitle: string;       // Subtítulo
  exampletext: string;    // Texto de ejemplo
  textcody: string;       // Texto corto / alias
  textfamily: string;     // Familia / grupo
  textundertake: string;  // Descripción adicional
}

/**
 * Tipo para datos que se envían al crear o actualizar un héroe.
 * No se incluye el id ya que se genera automáticamente.
 */
export type HeroInput = Omit<Hero, "id">;

/**
 * Tipo de error manejado por el hook
 */
export type ErrorType = string | null;
