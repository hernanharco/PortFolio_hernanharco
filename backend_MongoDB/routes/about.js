import express from "express";
import About from "../models/About.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const abouts = await About.find();
  res.json(abouts);
});

// POST
router.post("/", async (req, res) => {
  const newAbout = new About(req.body);
  const savedAbout = await newAbout.save();
  res.json(savedAbout);
});

// PUT
router.put("/:id", async (req, res) => {
  const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedAbout);
});

// --- NUEVA RUTA PATCH para actualizar todo highlights ---
router.patch("/:id/highlights", async (req, res) => {
  // 1. Verificar que 'highlights' esté presente en el cuerpo
  if (!req.body.highlights) {
    return res.status(400).json({
      message: "Se requiere el array 'highlights' en el cuerpo de la petición.",
    });
  }

  try {
    // 2. Usar $set para reemplazar SOLAMENTE el campo 'highlights' con el nuevo array
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $set: { highlights: req.body.highlights } },
      { new: true, runValidators: true } // new: true devuelve el doc actualizado
    );

    if (!updatedAbout) {
      return res
        .status(404)
        .json({ message: "Documento About no encontrado." });
    }

    res.json({
      message: "Highlights actualizados con éxito.",
      data: updatedAbout.highlights,
    });
  } catch (error) {
    console.error("Error al actualizar highlights:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
});

// --- ✅ NUEVA RUTA: AGREGAR UN SOLO OBJETO A HIGHLIGHTS (usando $push) ---
router.patch("/:id/highlights/add", async (req, res) => {
  // El cuerpo de la petición (req.body) debe ser el objeto highlight individual
  const newHighlight = req.body;

  // Verificación básica del objeto
  if (!newHighlight || !newHighlight.title || !newHighlight.image) {
    return res.status(400).json({
      message:
        "Se requiere un objeto highlight válido con al menos 'title' e 'image'.",
    });
  }

  try {
    // 1. Usar $push para añadir el nuevo objeto al array 'highlights' existente
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $push: { highlights: newHighlight } }, // ⬅️ $push agrega el objeto
      { new: true, runValidators: true }
    );

    if (!updatedAbout) {
      return res
        .status(404)
        .json({ message: "Documento About no encontrado." });
    }

    // Devolvemos el array 'highlights' actualizado para confirmación
    res.json({
      message: "Nuevo highlight agregado con éxito.",
      data: updatedAbout.highlights,
    });
  } catch (error) {
    console.error("Error al agregar highlight:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
});

// --- ✅ NUEVA RUTA: ELIMINAR UN OBJETO DE HIGHLIGHTS (usando $pull) ---
router.patch("/:id/highlights/remove", async (req, res) => {
  // Requerimos la ID del documento principal y un campo para identificar el subdocumento
  const { id } = req.params;
  const { title } = req.body; // Asumimos que enviamos el 'title' del elemento a eliminar

  if (!title) {
    return res.status(400).json({
      message:
        "Se requiere el 'title' del highlight a eliminar en el cuerpo de la petición.",
    });
  }

  try {
    // 1. Usar $pull para eliminar el objeto del array 'highlights'
    const updatedAbout = await About.findByIdAndUpdate(
      id,
      {
        $pull: {
          // Operador $pull
          highlights: { title: title }, // Elimina CUALQUIER objeto dentro de 'highlights'
          // donde el campo 'title' coincida con el valor enviado.
        },
      },
      { new: true } // new: true devuelve el documento después de la actualización
    );

    if (!updatedAbout) {
      return res
        .status(404)
        .json({ message: "Documento About no encontrado." });
    }

    res.json({
      message: `Highlight con título '${title}' eliminado con éxito.`,
      data: updatedAbout.highlights, // Devolvemos el array actualizado
    });
  } catch (error) {
    console.error("Error al eliminar highlight:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: "Elemento eliminado" });
});

export default router;
