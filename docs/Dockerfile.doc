# Etapa 0: Instalación y Cacheo
FROM node:20-slim AS deps

# Directorio de trabajo
WORKDIR /app

# 1. Habilitar Corepack para gestionar pnpm
RUN corepack enable

# 2. Copiar solo los archivos de configuración
COPY package.json pnpm-lock.yaml ./

# 3. Instalar dependencias con hoist para VitePress
RUN --mount=type=cache,target=/pnpm/store pnpm install \
    --frozen-lockfile \
    --shamefully-hoist 
# La salida de este paso crea node_modules y el pnpm store cacheado.


# -----------------------------------------------------------

# Etapa 1: Construcción de VitePress (Donde ocurría el error "pnpm: not found")
FROM node:20-slim AS builder

WORKDIR /app

# **[¡CORRECCIÓN CLAVE 1!]** Re-habilitar Corepack en esta etapa.
RUN corepack enable

# **[¡CORRECCIÓN CLAVE 2!]** Configurar el PATH de pnpm (si se usa la instalación global, aunque aquí es por corepack)
# Esto asegura que el comando 'pnpm' sea encontrado.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# 3. Copiar dependencias ya instaladas desde la etapa anterior.
# Copiamos todo lo de /app, incluyendo node_modules y los archivos de configuración.
COPY --from=deps /app .

# 4. Copiar el resto del proyecto
COPY . .

# 5. Construir VitePress (Ahora pnpm será encontrado)
RUN pnpm run build

# -----------------------------------------------------------
# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copiar el build de VitePress desde la etapa anterior
COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]