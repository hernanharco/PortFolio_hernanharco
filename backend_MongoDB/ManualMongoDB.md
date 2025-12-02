si comencemos

# ✅ Tutorial actualizado: Vite + Node.js + MongoDB Atlas (1 solo cluster)
## Paso 1: Crear base de datos en Atlas

1. Entra en tu cuenta de MongoDB Atlas.

2. Ve a tu cluster gratuito.

3. Haz clic en "Collections".

4. Haz clic en "Create Database".

5. Llena los campos:

- Database Name: mi_portfolio

- Collection Name: about

6. Haz clic en Create.

Ahora agrega la segunda colección:

1. Dentro de mi_portfolio, haz clic en "Create Collection".

2. Nombre: skills.

¡Listo! Ya tienes tu base de datos mi_portfolio y tus colecciones.

____

# Paso 2: Crear carpeta backend

Dentro de tu proyecto Vite:
```
mkdir backend_MongoDB
cd backend_MongoDB
pnpm init -y
```

Instala dependencias:
```
pnpm install express mongoose cors dotenv
pnpm install -D nodemon
```
____

# Paso 3: Crear archivo .env

En backend_MongoDB/.env:

PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/mi_portfolio?retryWrites=true&w=majority


Reemplaza <usuario>, <password> y <cluster> por los valores reales.

## 🔍 ¿Dónde encontrar la conexión (Connection String) en Atlas?

✔️ Paso 1: Entra a tu cluster

1. Entra a tu cuenta de Atlas.

2. En el panel principal, ve a tu cluster gratuito.

✔️ Paso 2: Clic en “Connect”

En tu cluster verás un botón verde que dice:

👉 “Connect”

Haz clic ahí.

✔️ Paso 3: Elegir la opción de conexión

Atlas te mostrará un menú. Selecciona:

👉 “Connect your application”
(No elijas “Compass”, ni “Shell”, el de “Application” es el correcto para Node.js.)

✔️ Paso 4: Copiar la cadena de conexión

Aparecerá algo así:

mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


Esta es la cadena de conexión.

✔️ Paso 5: Modificarla para usar tu base de datos

Atlas no siempre incluye la base de datos, así que tú se la agregas:

mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mi_portfolio?retryWrites=true&w=majority


🟢 Donde dice mi_portfolio pon el nombre de tu base de datos.

✔️ Paso 6: Reemplazar usuario y contraseña

Sustituye:

<username> por el usuario que creaste para la base de datos

<password> por la contraseña que le asignaste

⚠️ Importante: la contraseña NO puede tener caracteres especiales sin codificar (como @, #, %, /).
Si la tiene, cámbiala en Atlas.

## 🟩 Ejemplo real de .env

Supongamos:

Usuario: adminUser

Contraseña: 12345678

Cluster: cluster0.abcde.mongodb.net

Tu .env quedaría así:

MONGO_URI=mongodb+srv://adminUser:12345678@cluster0.abcde.mongodb.net/mi_portfolio?retryWrites=true&w=majority
PORT=5000

## 🟦 ¿Dónde ver o cambiar el usuario y contraseña?

Si no recuerdas tu usuario o quieres crear uno nuevo:

1. Ve a Database Access en el menú lateral.

2. Ahí verás todos los usuarios.

3. Puedes:

- Crear un nuevo usuario

- Cambiar la contraseña

- Ver su rol

El usuario debe tener **Read and Write to any database** o similar.

### ⛔ Antes de seguir, importante:
⚠️ Si tu contraseña tiene:

@

%

/

?

Necesitas codificarla o cambiarla a algo simple.

Ejemplo:

Contraseña: Mi@Pass#2024 ❌

Contraseña recomendada: MiPass2024 ✔️

⚠️ Si tienes dudas, muéstrame tu contraseña (parcial) y te digo si es válida o si necesitas cambiarla.

## 🟧 ¿Dónde permitir tu IP? (Necesario para que funcione)

Ve a:

👉 Network Access

Y agrega tu IP:

- Opción recomendada: Add Current IP

- Para pruebas: 0.0.0.0/0 (permite todo, no usar en producción)

## ✅ 2: PROBAR LA CONEXIÓN DESDE NODE

Dentro de tu carpeta backend_MongoDB, crea un archivo:

📄 test_connection.js
```
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conexión exitosa a MongoDB Atlas");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  });
```

Luego, en tu terminal:
```
node test_connection.js
```

## 🧪 3. POSIBLES RESULTADOS
🟢 Si todo sale bien

Verás:

✅ Conexión exitosa a MongoDB Atlas


Y listo, tu backend ya está conectado.

## 🔴 Si da error, usualmente dice algo como:

Authentication failed
→ usuario o contraseña incorrectos

IP not allowed
→ revisa Network Access

ENOTFOUND
→ mal escrito el nombre del cluster

Timeout
→ contraseña incorrecta o la IP no está permitida
___

# Paso 4: Crear servidor Express

Crea un archivo index.js dentro de backend_MongoDB:
```
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```
instalar
```
pnpm install -g nodemon
```

ejecuta el servidor:

```
pnpm nodemon index.js
```
el package.json
```
{
  "scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "mongoose": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  },
  "type": "module"
}
```
___
#  Paso 5: Crear modelos de MongoDB (colecciones)

Crea una carpeta models dentro de backend_MongoDB.

models/About.js:
```
import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export default mongoose.model('About', aboutSchema);
```
models/Skills.js:
```
import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  level: String, // Ej: "Básico", "Intermedio", "Avanzado"
});

export default mongoose.model('Skills', skillSchema);
```
_______
# Paso 6: Crear rutas CRUD

Crea una carpeta routes:

routes/about.js:
```
import express from 'express';
import About from '../models/About.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const abouts = await About.find();
  res.json(abouts);
});

// POST
router.post('/', async (req, res) => {
  const newAbout = new About(req.body);
  const savedAbout = await newAbout.save();
  res.json(savedAbout);
});

// PUT
router.put('/:id', async (req, res) => {
  const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedAbout);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: 'Elemento eliminado' });
});

export default router;
```
routes/skills.js:
```
import express from 'express';
import Skills from '../models/Skills.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const skills = await Skills.find();
  res.json(skills);
});

// POST
router.post('/', async (req, res) => {
  const newSkill = new Skills(req.body);
  const savedSkill = await newSkill.save();
  res.json(savedSkill);
});

// PUT
router.put('/:id', async (req, res) => {
  const updatedSkill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedSkill);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Skills.findByIdAndDelete(req.params.id);
  res.json({ message: 'Elemento eliminado' });
});

export default router;
```
_______
Paso 7: Conectar rutas en index.js

Agrega al index.js:

```
import aboutRoutes from './routes/about.js';
import skillsRoutes from './routes/skills.js';

app.use('/about', aboutRoutes);
app.use('/skills', skillsRoutes);
```
quedaria
```
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import aboutRoutes from './routes/about.js';
import skillsRoutes from './routes/skills.js';

dotenv.config();

const app = express();

app.use('/about', aboutRoutes);
app.use('/skills', skillsRoutes);

// Middlewares
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```
______
Paso 8: Probar con Postman
```
1. Abre Postman y crea nuevas requests:

- GET http://localhost:5000/about → devuelve todos los about.

- POST http://localhost:5000/about → agrega un nuevo about (body tipo JSON):
```
{
  "title": "Acerca de mí",
  "description": "Desarrollador frontend con pasión por JS"
}
```

- PUT http://localhost:5000/about/:id → actualiza un about.

- DELETE http://localhost:5000/about/:id → elimina un about.

2. Haz lo mismo con /skills.

Con esto puedes probar tu backend antes de conectarlo con tu frontend Vite.
