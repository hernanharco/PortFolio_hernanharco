import React, { useState, useEffect } from "react";
import { ArrowDown, MapPin, Heart, Code, Lightbulb, Edit, Save, X, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import useHero from "@/hero/hooks/useHero.jsx"; 
import UpdateButton from "@/components/ui/UpdateButton.jsx"; 

const HeroSection = () => {
	// 1. Desestructurar todos los estados, fetchHeroes, y updateHero
	const { heroes, isLoading, error, separator, namePart, fetchHeroes, updateHero } = useHero();

	// 2. Extraer los datos y el ID del primer héroe
	const heroData = heroes.length > 0 ? heroes[0] : null;
	const heroId = heroData?.id; 

	// --- Estados para la Edición ---
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({});
	const [isSaving, setIsSaving] = useState(false);

	// 3. Sincronizar formData con heroData al cargar o actualizar
	useEffect(() => {
		if (heroData) {
			// Usamos nullish coalescing (|| '') para asegurar que no se pase 'undefined' al input
			setFormData({
				title: heroData.title || '',
				subtitle: heroData.subtitle || '',
				exampletext: heroData.exampletext || '',
				city: heroData.city || '',
				// AÑADIDOS LOS NUEVOS CAMPOS
				textcody: heroData.textcody || '',
				textfamily: heroData.textfamily || '',
				textundertake: heroData.textundertake || ''
			});
		}
	}, [heroData]);


	// --- Manejadores ---

	const scrollToAbout = () => {
		const element = document.querySelector("#about");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSave = async () => {
		if (!heroId) return;

		setIsSaving(true);
		// 1. Datos a guardar
		const dataToSave = {
			title: formData.title,
			subtitle: formData.subtitle,
			exampletext: formData.exampletext,
			city: formData.city,
			// AÑADIDOS LOS NUEVOS CAMPOS A LA CARGA
			textcody: formData.textcody,
			textfamily: formData.textfamily,
			textundertake: formData.textundertake
		};

		// 2. Llamar a la función de actualización del hook
		const updatedHero = await updateHero(heroId, dataToSave);
		
		setIsSaving(false);

		if (updatedHero) {
			setIsEditing(false); // Salir del modo edición si fue exitoso
		} 
	};
	
	// Función para cancelar la edición y revertir los cambios
	const handleCancel = () => {
		setIsEditing(false);
		// Revertir a los datos originales al cancelar
		if (heroData) {
			setFormData({
				title: heroData.title || '',
				subtitle: heroData.subtitle || '',
				exampletext: heroData.exampletext || '',
				city: heroData.city || '',
				// Revertir también los nuevos campos
				textcody: heroData.textcody || '',
				textfamily: heroData.textfamily || '',
				textundertake: heroData.textundertake || ''
			});
		}
	};

	// Clases de utilidad para los campos editables
	const editableClass = "p-1 rounded-md transition-colors duration-200 border border-transparent focus:border-blue-400 focus:bg-white resize-none outline-none text-center";
	const viewClass = "p-1";


	// --- Renderizado del Componente ---

	return (
		<section
			id="home"
			className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="text-center">
					
					{/* --- Área de Control de Estado y Botón de Recarga (Si hay error) --- */}
					{(isLoading || error) && (
						<div className="mb-6 flex flex-col items-center space-y-4">
							{isLoading && !error && (
								<p className="text-xl text-blue-500">Cargando datos del héroe...</p>
							)}
							{error && (
								<p className="text-xl text-red-500">Error: {error}</p>
							)}
							{/* Botón de recarga/reintento */}
							<UpdateButton 
								onClick={fetchHeroes}
								isLoading={isLoading}
								text="Recargar Datos"
							/>
						</div>
					)}

					{/* 3. Renderizar Contenido Solo Cuando los Datos Estén Listos */}
					{heroData && (
						<>
							{/* City (Editable) */}
							<div className="mb-6">
								<span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
									<MapPin className="w-4 h-4 mr-2" />
									{isEditing ? (
										<input
											type="text"
											name="city"
											value={formData.city}
											onChange={handleFormChange}
											className={`text-center bg-transparent focus:outline-none ${editableClass}`}
											// Ajusta el ancho dinámicamente
											style={{ width: `${(formData.city.length > 0 ? formData.city.length : 1) * 0.75}em` }}
										/>
									) : (
										<span className={viewClass}>{heroData.city}</span>
									)}
								</span>
							</div>

							{/* Main Title (Editable - se edita el 'title' completo) */}
							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
								{isEditing ? (
									<input
										type="text"
										name="title"
										value={formData.title}
										onChange={handleFormChange}
										className={`w-full bg-white text-gray-900 focus:outline-none ${editableClass} text-4xl md:text-6xl lg:text-7xl font-bold`}
									/>
								) : (
									<>
										{/* En modo vista, usamos las partes separadas por el hook */}
										{separator}
										<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
											{namePart}
										</span>
									</>
								)}
							</h1>

							{/* Subtitle (Editable) */}
							<h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto">
								{isEditing ? (
									<input
										type="text"
										name="subtitle"
										value={formData.subtitle}
										onChange={handleFormChange}
										className={`w-full bg-white text-gray-600 focus:outline-none ${editableClass} text-xl md:text-2xl lg:text-3xl`}
									/>
								) : (
									<span className={viewClass}>{heroData.subtitle}</span>
								)}
							</h2>

							{/* Description (Editable - Usamos textarea) */}
							<p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
								{isEditing ? (
									<textarea
										name="exampletext"
										value={formData.exampletext}
										onChange={handleFormChange}
										rows={4}
										className={`w-full bg-white text-gray-700 focus:outline-none ${editableClass} text-lg`}
									/>
								) : (
									<span className={viewClass}>{heroData.exampletext}</span>
								)}
							</p>

							{/* Key Points (AHORA EDITABLES) */}
							<div className="flex flex-wrap justify-center gap-6 mb-12">
								{/* Punto 1: Code */}
								<div className="flex items-center text-gray-700">
									<Code className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
									{isEditing ? (
										<input
											type="text"
											name="textcody"
											value={formData.textcody}
											onChange={handleFormChange}
											className={`bg-white text-gray-700 focus:outline-none ${editableClass} w-auto`}
											style={{ minWidth: '100px' }}
										/>
									) : (
										<span className={viewClass}>{heroData.textcody}</span>
									)}
								</div>
								
								{/* Punto 2: Lightbulb (Emprendimiento) */}
								<div className="flex items-center text-gray-700">
									<Lightbulb className="w-5 h-5 mr-2 text-indigo-600 flex-shrink-0" />
									{isEditing ? (
										<input
											type="text"
											name="textundertake"
											value={formData.textundertake}
											onChange={handleFormChange}
											className={`bg-white text-gray-700 focus:outline-none ${editableClass} w-auto`}
											style={{ minWidth: '100px' }}
										/>
									) : (
										<span className={viewClass}>{heroData.textundertake}</span>
									)}
								</div>
								
								{/* Punto 3: Heart (Familia) */}
								<div className="flex items-center text-gray-700">
									<Heart className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" />
									{isEditing ? (
										<input
											type="text"
											name="textfamily"
											value={formData.textfamily}
											onChange={handleFormChange}
											className={`bg-white text-gray-700 focus:outline-none ${editableClass} w-auto`}
											style={{ minWidth: '100px' }}
										/>
									) : (
										<span className={viewClass}>{heroData.textfamily}</span>
									)}
								</div>
							</div>

							{/* --- CTA Buttons y Botones de Edición (Ubicación Final) --- */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
								{/* Botones en Modo Edición */}
								{isEditing ? (
									<>
										<Button
											onClick={handleSave}
											disabled={isSaving || isLoading}
											className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg flex items-center"
										>
											{isSaving ? <RotateCw className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
											{isSaving ? 'Guardando...' : 'Guardar Cambios'}
										</Button>
										<Button
											onClick={handleCancel}
											variant="outline"
											className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 text-lg flex items-center"
											disabled={isSaving || isLoading}
										>
											<X className="w-5 h-5 mr-2" />
											Cancelar
										</Button>
									</>
								) : (
									// Botones en Modo Vista (incluyendo el de Edición)
									<>
										<Button
											onClick={scrollToAbout}
											size="lg"
											className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
										>
											Conoce mi historia
										</Button>
										<Button
											onClick={() =>
												document
													.querySelector("#projects")
													?.scrollIntoView({ behavior: "smooth" })
											}
											variant="outline"
											size="lg"
											className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
										>
											Ver mis proyectos
										</Button>
										
										{/* Botón para entrar en modo edición (ubicado al lado de los CTA) */}
										<Button
											onClick={() => setIsEditing(true)}
											variant="outline"
											size="lg"
											className="border-gray-600 text-gray-600 hover:bg-gray-50 px-8 py-3 text-lg flex items-center"
											disabled={isLoading}
										>
											<Edit className="w-5 h-5 mr-2" />
											Editar
										</Button>
									</>
								)}
							</div>
							{/* --- Fin CTA Buttons --- */}

							{/* Scroll Indicator (Solo visible en modo vista) */}
							{!isEditing && (
								<div className="animate-bounce">
									<button
										onClick={scrollToAbout}
										className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
									>
										<ArrowDown className="w-6 h-6 mx-auto" />
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
