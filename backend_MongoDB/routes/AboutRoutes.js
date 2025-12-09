import express from "express";
import About from "../models/AboutModel.js";

const router = express.Router();

// ====================================================================
// --- RUTAS PRINCIPALES (GET, POST, PUT, DELETE) ---
// ====================================================================

// GET all
router.get("/", async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener documentos About.", error: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const newAbout = new About(req.body);
  try {
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el documento About.", error: error.message });
  }
});

// PUT (Actualiza el documento completo, incluyendo campos simples como titlecorevalues)
router.put("/:id", async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el documento About.", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);
    if (!deletedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({ message: "Elemento eliminado con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el documento About.", error: error.message });
  }
});

// ====================================================================
// --- RUTAS PATCH PARA EL ARRAY 'highlights' (Existentes) ---
// ====================================================================

// PATCH: Reemplazar TODO el array 'highlights'
router.patch("/:id/highlights", async (req, res) => {
  // 1. Verificar que 'highlights' esté presente en el cuerpo
  if (!req.body.highlights || !Array.isArray(req.body.highlights)) {
    return res.status(400).json({
      message: "Se requiere el array 'highlights' en el cuerpo de la petición.",
    });
  }
  try {
    // 2. Usar $set para reemplazar SOLAMENTE el campo 'highlights'
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $set: { highlights: req.body.highlights } },
      { new: true, runValidators: true } 
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({
      message: "Highlights actualizados con éxito (reemplazo completo).",
      data: updatedAbout.highlights,
    });
  } catch (error) {
    console.error("Error al actualizar highlights:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
});

// PATCH: AGREGAR un elemento al array 'highlights' (usando $push)
router.patch("/:id/highlights/add", async (req, res) => {
  const newHighlight = req.body;
  if (!newHighlight || !newHighlight.title || !newHighlight.image) {
    return res.status(400).json({
      message:
        "Se requiere un objeto highlight válido con al menos 'title' e 'image'.",
    });
  }
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $push: { highlights: newHighlight } }, 
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({
      message: "Nuevo highlight agregado con éxito.",
      data: updatedAbout.highlights,
    });
  } catch (error) {
    console.error("Error al agregar highlight:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
});

// PATCH: ELIMINAR un elemento de 'highlights' por 'title' (usando $pull)
router.patch("/:id/highlights/remove", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body; 

  if (!title) {
    return res.status(400).json({
      message: "Se requiere el 'title' del highlight a eliminar en el cuerpo de la petición.",
    });
  }
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      id,
      {
        $pull: {
          highlights: { title: title },
        },
      },
      { new: true } 
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({
      message: `Highlight con título '${title}' eliminado con éxito.`,
      data: updatedAbout.highlights,
    });
  } catch (error) {
    console.error("Error al eliminar highlight:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
});

// ====================================================================
// --- ✅ NUEVAS RUTAS PATCH PARA EL ARRAY 'corevalues' ---
// ====================================================================

// PATCH: Reemplazar TODO el array 'corevalues'
router.patch("/:id/corevalues", async (req, res) => {
  if (!req.body.corevalues || !Array.isArray(req.body.corevalues)) {
    return res.status(400).json({
      message: "Se requiere el array 'corevalues' en el cuerpo de la petición.",
    });
  }
  try {
    // Usar $set para reemplazar SOLAMENTE el campo 'corevalues'
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $set: { corevalues: req.body.corevalues } },
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({
      message: "Core Values actualizados con éxito (reemplazo completo).",
      data: updatedAbout.corevalues,
    });
  } catch (error) {
    console.error("Error al actualizar Core Values:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
});

// PATCH: AGREGAR un elemento al array 'corevalues' (usando $push)
router.patch("/:id/corevalues/add", async (req, res) => {
  const newCoreValue = req.body;
  // Verificación básica de campos requeridos (image, title, text) según tu esquema
  if (!newCoreValue || !newCoreValue.image || !newCoreValue.title || !newCoreValue.text) {
    return res.status(400).json({
      message:
        "Se requiere un objeto Core Value válido con al menos 'image', 'title' y 'text'.",
    });
  }
  try {
    // Usar $push para añadir el nuevo objeto al array
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $push: { corevalues: newCoreValue } },
      { new: true, runValidators: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({
      message: "Nuevo Core Value agregado con éxito.",
      data: updatedAbout.corevalues,
    });
  } catch (error) {
    console.error("Error al agregar Core Value:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
});

// PATCH: ELIMINAR un elemento de 'corevalues' por 'title' (usando $pull)
router.patch("/:id/corevalues/remove", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Se requiere el 'title' del Core Value a eliminar.",
    });
  }
  try {
    // Usar $pull para eliminar el objeto del array donde el título coincida
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $pull: { corevalues: { title: title } } }, 
      { new: true }
    );
    if (!updatedAbout) {
      return res.status(404).json({ message: "Documento About no encontrado." });
    }
    res.json({
      message: `Core Value con título '${title}' eliminado con éxito.`,
      data: updatedAbout.corevalues,
    });
  } catch (error) {
    console.error("Error al eliminar Core Value:", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
});

export default router;